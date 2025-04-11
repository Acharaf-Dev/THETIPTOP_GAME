pipeline {
    agent {
        docker {
            image 'node:20.19.0'
            args '-v $PWD:/app'  // Monter le volume du workspace Jenkins (facultatif)
        }
    }

    environment {
        // 🛠️ Docker
        DOCKER_REGISTRY = 'docker.io'
        BACKEND_IMAGE_NAME = "${DOCKER_REGISTRY}/asquare25/thetiptop"
        FRONTEND_IMAGE_NAME = "${DOCKER_REGISTRY}/asquare25/thetiptop"
        
        SSH_HOST = 'ton.serveur.exemple.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install, Test & Build') {
            steps {
                script {
                    ['backend', 'frontend'].each { module -> 
                        dir(module) {
                            sh 'npm install'

                            if (module == 'frontend') {
                                // Ajout spécifique pour le dossier frontend
                                sh 'chmod -R +x node_modules/.bin'  // Permissions d'exécution
                                withEnv(["CI=false"]) {
                                    sh 'npm run build'  // Exécuter le script build uniquement pour frontend
                                }
                            } else {
                                echo "Pas de script build pour ${module}"
                            }
                        }
                    }
                }
            }
        }

        stage('Build & Push Docker Images') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        def backendImage = "${BACKEND_IMAGE_NAME}:${BRANCH_NAME}"
                        def frontendImage = "${FRONTEND_IMAGE_NAME}:${BRANCH_NAME}"

                        // Docker login avec un Personal Access Token
                        sh """
                            echo \${DOCKER_PASS} | docker login -u \${DOCKER_USER} --password-stdin
                        """

                        // Build et Push pour backend
                        sh """
                            docker build -t ${backendImage} ./backend
                            docker push ${backendImage}
                        """

                        // Build et Push pour frontend
                        sh """
                            docker build -f ./frontend/Dockerfile.prod -t ${frontendImage} ./frontend
                            docker push ${frontendImage}
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'ssh-credentials', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')]) {
                    sh """
                        sshpass -p "\${SSH_PASS}" ssh -o StrictHostKeyChecking=no "\${SSH_USER}@\${SSH_HOST}" '
                        cd /opt/docker-compose &&
                        docker-compose pull &&
                        docker-compose up -d
                        '
                    """
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker system prune -f --volumes'
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH_NAME == 'prod') {
                    echo '✅ Déploiement prod terminé. Sauvegarde...'
                    sh './scripts/backup.sh'
                } else {
                    echo "✅ Pipeline terminée avec succès sur branche ${BRANCH_NAME}"
                }
            }
        }
        failure {
            echo "❌ Pipeline échouée sur branche ${BRANCH_NAME}"
        }
        always {
            echo "📦 Fin d’exécution de la pipeline"
        }
    }
}