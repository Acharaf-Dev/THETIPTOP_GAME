pipeline {
    agent any

    environment {
        // 🛠️ Docker
        DOCKER_REGISTRY = 'docker.io'
        BACKEND_IMAGE_NAME = "${DOCKER_REGISTRY}/tiptop-backend"
        FRONTEND_IMAGE_NAME = "${DOCKER_REGISTRY}/tiptop-frontend"

        // 🧪 Qualité
        SONARQUBE_URL = 'https://sonarqube.dsp5-archi-f24a-15m-g8.fr'
        SONARQUBE_TOKEN = credentials('sonarqube-token-last')

        // 🧑‍💻 Docker Hub creds
        DOCKER_USER = credentials('dockerhub-credentials').username
        DOCKER_PASS = credentials('dockerhub-credentials').password

        // 🔐 SSH creds
        SSH_USER = credentials('ssh-credentials').username
        SSH_PASS = credentials('ssh-credentials').password
        SSH_HOST = 'ton.serveur.exemple.com'

        // 📦 Shared
        DOCKER_NODE_IMAGE = 'node:16'
        DOCKER_ARGS = '-v $PWD:/app'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // 👉 Install, Test & Build for both frontend/backend
        ['backend', 'frontend'].each { module ->
            stage("Install Dependencies - ${module}") {
                steps {
                    dir(module) {
                        sh 'npm install'
                    }
                }
            }

            stage("Run Tests - ${module}") {
                steps {
                    dir(module) {
                        sh 'npm run test -- --coverage --coverageReporters=lcov'
                    }
                }
                post {
                    always {
                        publishHTML(target: [
                            reportName: "${module.capitalize()} Coverage",
                            reportDir: "${module}/coverage",
                            reportFiles: 'index.html',
                            keepAll: true,
                            allowMissing: true,
                            alwaysLinkToLastBuild: true
                        ])
                    }
                }
            }

            stage("Build ${module.capitalize()}") {
                steps {
                    dir(module) {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npx sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build & Push Docker Images') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            steps {
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

        stage('Deploy') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            steps {
                sh """
                    sshpass -p "${SSH_PASS}" ssh -o StrictHostKeyChecking=no "${SSH_USER}@${SSH_HOST}" '
                      cd /opt/docker-compose &&
                      docker-compose pull &&
                      docker-compose up -d
                    '
                """
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
