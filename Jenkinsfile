pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        APP_NAME = "tip_top_app"
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials') // Jenkins > DockerHub credentials
        GITHUB_CREDENTIALS = credentials('github-credentials-token')  // Ajouter le credential GitHub
        SONARQUBE_ENV = 'SonarQubeServer' // Jenkins > SonarQube Servers
        SONAR_SCANNER = tool 'SonarQubeScanner'
    }

    stages {

        stage('Checkout') {
            steps {
                script {
                    // Utilisation des credentials GitHub pour cloner le repository
                    git credentialsId: 'github-credentials', url: 'https://github.com/Acharaf-Dev/THETIPTOP_GAME.git'
                }
            }
        }

        stage('Set Docker Paths') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        env.DOCKERFILE_BACKEND = './backend/Dockerfile.dev'
                        env.DOCKERFILE_FRONTEND = './frontend/Dockerfile.dev'
                        env.DOCKER_COMPOSE_FILE = './docker-compose.dev.yml'
                        env.ENV_FILE_BACKEND = './backend/.env.dev'
                        env.ENV_FILE_FRONTEND = './frontend/.env.dev'
                    } else if (env.BRANCH_NAME == 'preprod') {
                        env.DOCKERFILE_BACKEND = './backend/Dockerfile.preprod'
                        env.DOCKERFILE_FRONTEND = './frontend/Dockerfile.preprod'
                        env.DOCKER_COMPOSE_FILE = './docker-compose.preprod.yml'
                        env.ENV_FILE_BACKEND = './backend/.env.preprod'
                        env.ENV_FILE_FRONTEND = './frontend/.env.preprod'
                    } else if (env.BRANCH_NAME == 'prod') {
                        env.DOCKERFILE_BACKEND = './backend/Dockerfile.prod'
                        env.DOCKERFILE_FRONTEND = './frontend/Dockerfile.prod'
                        env.DOCKER_COMPOSE_FILE = './docker-compose.prod.yml'
                        env.ENV_FILE_BACKEND = './backend/.env.prod'
                        env.ENV_FILE_FRONTEND = './frontend/.env.prod'
                    }
                    env.NAMESPACE = "${APP_NAME}_${env.BRANCH_NAME}"
                }
            }
        }

        stage('Check .env Files') {
            steps {
                script {
                    sh "ls ${ENV_FILE_BACKEND}" // Vérifier si le fichier .env est présent pour le backend
                    sh "ls ${ENV_FILE_FRONTEND}" // Vérifier si le fichier .env est présent pour le frontend
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm run test -- --coverage --coverageReporters=lcov'
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('frontend') {
                    sh 'npm run test -- --coverage --coverageReporters=lcov'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh """
                        ${SONAR_SCANNER}/bin/sonar-scanner \
                          -Dsonar.projectKey=${APP_NAME}-${env.BRANCH_NAME} \
                          -Dsonar.sources=backend,frontend \
                          -Dsonar.exclusions=**/node_modules/**,**/__tests__/** \
                          -Dsonar.javascript.lcov.reportPaths=backend/coverage/lcov.info,frontend/coverage/lcov.info \
                          -Dsonar.sourceEncoding=UTF-8
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    sh "docker build -t ${REGISTRY}/${APP_NAME}:backend-${env.BRANCH_NAME} -f ${DOCKERFILE_BACKEND} ./backend"
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    sh "docker build -t ${REGISTRY}/${APP_NAME}:frontend-${env.BRANCH_NAME} -f ${DOCKERFILE_FRONTEND} ./frontend"
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS}") {
                        sh "docker push ${REGISTRY}/${APP_NAME}:backend-${env.BRANCH_NAME}"
                        sh "docker push ${REGISTRY}/${APP_NAME}:frontend-${env.BRANCH_NAME}"
                    }
                }
            }
        }

        stage('Deploy to Environment') {
            steps {
                script {
                    sh """
                        docker-compose -p ${NAMESPACE} -f ${DOCKER_COMPOSE_FILE} up -d --build
                    """
                }
            }
        }

        stage('Cleanup (Optional)') {
            when {
                expression { return false } // Par défaut désactivé, activable manuellement
            }
            steps {
                script {
                    sh "docker-compose -p ${NAMESPACE} -f ${DOCKER_COMPOSE_FILE} down"
                }
            }
        }
    }

    post {
        always {
            // Archiver les rapports de couverture et les résultats des tests
            archiveArtifacts artifacts: '**/coverage/lcov.info', allowEmptyArchive: true
            junit '**/test-results/**/*.xml'
            cleanWs()
        }
        success {
            echo "✅ Déploiement réussi sur l'environnement ${env.BRANCH_NAME}"
        }
        failure {
            echo "❌ Échec du déploiement sur l'environnement ${env.BRANCH_NAME}"
        }
    }
}
