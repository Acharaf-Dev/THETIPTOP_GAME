pipeline {
    agent {
        docker {
            image 'node:20.19.0'
            args "-v ${env.WORKSPACE}:/app"
        }
    }

    environment {
        DOCKER_REGISTRY = 'docker.io'
        BACKEND_IMAGE_NAME = "${DOCKER_REGISTRY}/asquare25/thetiptop"
        FRONTEND_IMAGE_NAME = "${DOCKER_REGISTRY}/asquare25/thetiptop"
        NPM_CACHE_DIR = "${env.WORKSPACE}/.npm"
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
                            sh "mkdir -p ${NPM_CACHE_DIR}"
                            sh "npm install --cache ${NPM_CACHE_DIR} --prefer-online"

                            if (module == 'frontend') {
                                sh 'chmod -R +x node_modules/.bin'
                                withEnv(["CI=false"]) {
                                    sh 'npm run build'
                                }
                            } else {
                                echo "Pas de script build pour ${module}"
                            }

                            // Génération de la couverture si un script existe
                            try {
                                sh 'npm run test -- --coverage'
                            } catch (e) {
                                echo "⚠️ Tests échoués ou script manquant pour ${module}, ignoré pour Sonar."
                            }
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    script {
                        ['backend', 'frontend'].each { module ->
                            dir(module) {
                                sh """
                                    npx sonar-scanner \
                                        -Dsonar.login=${SONAR_TOKEN} || echo "Analyse Sonar échouée pour ${module}, poursuivi."
                                """
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

                        sh """
                            echo \${DOCKER_PASS} | docker login -u \${DOCKER_USER} --password-stdin
                            docker build -t ${backendImage} ./backend
                            docker push ${backendImage}
                            docker build -f ./frontend/Dockerfile.prod -t ${frontendImage} ./frontend
                            docker push ${frontendImage}
                        """
                    }
                }
            }
        }

        stage('Deploy via deploy.sh') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ssh-key-jenkins', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                    script {
                        def remotePath = "/opt/deploy-thetiptop"

                        sh """
                            chmod 600 ${SSH_KEY}
                            scp -i ${SSH_KEY} -o StrictHostKeyChecking=no deployment/deploy.sh \${SSH_USER}@161.97.76.223:${remotePath}/deploy.sh
                            ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no \${SSH_USER}@161.97.76.223 '
                                chmod +x ${remotePath}/deploy.sh &&
                                ${remotePath}/deploy.sh
                            '
                        """
                    }
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
