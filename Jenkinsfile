pipeline {
    agent {
        docker {
            image 'node:20.19.0'
            args '-v $PWD:/app'
        }
    }

    environment {
        DOCKER_REGISTRY = 'docker.io'
        BACKEND_IMAGE_NAME = "${DOCKER_REGISTRY}/tiptop-backend"
        FRONTEND_IMAGE_NAME = "${DOCKER_REGISTRY}/tiptop-frontend"
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
                    dir('backend') {
                        sh 'npm install'

                        if (fileExists('package.json') && sh(script: 'npm run | grep -q "build"', returnStatus: true) == 0) {
                            sh 'npm run build'
                        } else {
                            echo "⚠️ Aucun script build trouvé pour backend, skip."
                        }
                    }

                    publishHTML(target: [
                        reportName: "Backend Coverage",
                        reportDir: "backend/coverage",
                        reportFiles: 'index.html',
                        keepAll: true,
                        allowMissing: true,
                        alwaysLinkToLastBuild: true
                    ])

                    dir('frontend') {
                        sh 'npm install'

                        withEnv(["CI=false"]) {
                            sh 'npm run build'
                        }
                    }

                    publishHTML(target: [
                        reportName: "Frontend Coverage",
                        reportDir: "frontend/coverage",
                        reportFiles: 'index.html',
                        keepAll: true,
                        allowMissing: true,
                        alwaysLinkToLastBuild: true
                    ])
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
                            echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                            docker build -t ${backendImage} ./backend
                            docker build -t ${frontendImage} ./frontend
                            docker push ${backendImage}
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
                        sshpass -p "${SSH_PASS}" ssh -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" '
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
