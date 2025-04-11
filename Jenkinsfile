pipeline {
    agent any

    tools {
        // Définir la version de NodeJS à utiliser
        nodejs 'NodeJS'  // Préciser l'ID du NodeJS installé dans Jenkins (par exemple, 'NodeJS_16' peut être l'ID que tu as configuré dans Jenkins)
    }

    environment {
        REGISTRY = "docker.io"
        APP_NAME = "tip_top_app"
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials') // Jenkins > DockerHub credentials
        SONARQUBE_ENV = 'SonarQubeServer' // Jenkins > SonarQube Servers
        SONAR_SCANNER = tool 'SonarQubeScanner'
    }

    stages {

        stage('Checkout') {
            steps {
                script {
                    try {
                        // Clonage du repository
                        git(
                            credentialsId: 'github-credentials-token',  // ID des credentials Jenkins pour GitHub
                            url: 'https://github.com/Acharaf-Dev/THETIPTOP_GAME.git',  // URL du repository
                            branch: env.BRANCH_NAME,  // Utilisation de la variable d'environnement BRANCH_NAME pour récupérer la branche en cours
                            changelog: true,  // Génère un changelog
                            poll: false,  // Désactive le polling
                            scmRetryCount: 3,  // Nombre de tentatives en cas d'échec du checkout
                            pollInterval: 1  // Intervalle entre les tentatives de polling (en secondes)
                        )

                        // Si nécessaire, faire un git pull explicite pour t'assurer de récupérer les dernières modifications
                        sh 'git fetch --all && git reset --hard origin/${env.BRANCH_NAME}'
                    } catch (Exception e) {
                        error "Échec du checkout du repository : ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Set Docker Paths') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop') {
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
                    try {
                        sh "ls ${ENV_FILE_BACKEND}" // Vérifier si le fichier .env est présent pour le backend
                        sh "ls ${ENV_FILE_FRONTEND}" // Vérifier si le fichier .env est présent pour le frontend
                    } catch (Exception e) {
                        error "Les fichiers .env ne sont pas présents ou erreur lors de la vérification : ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    script {
                        try {
                            sh 'npm install'
                        } catch (Exception e) {
                            error "Échec de l'installation des dépendances backend : ${e.getMessage()}"
                        }
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    script {
                        try {
                            sh 'npm install'
                        } catch (Exception e) {
                            error "Échec de l'installation des dépendances frontend : ${e.getMessage()}"
                        }
                    }
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    script {
                        try {
                            sh 'npm run test -- --coverage --coverageReporters=lcov'
                        } catch (Exception e) {
                            error "Échec des tests backend : ${e.getMessage()}"
                        }
                    }
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('frontend') {
                    script {
                        try {
                            sh 'npm run test -- --coverage --coverageReporters=lcov'
                        } catch (Exception e) {
                            error "Échec des tests frontend : ${e.getMessage()}"
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    script {
                        try {
                            sh """
                                ${SONAR_SCANNER}/bin/sonar-scanner \
                                  -Dsonar.projectKey=${APP_NAME}-${env.BRANCH_NAME} \
                                  -Dsonar.sources=backend,frontend \
                                  -Dsonar.exclusions=**/node_modules/**,**/__tests__/** \
                                  -Dsonar.javascript.lcov.reportPaths=backend/coverage/lcov.info,frontend/coverage/lcov.info \
                                  -Dsonar.sourceEncoding=UTF-8
                            """
                        } catch (Exception e) {
                            error "Échec de l'analyse SonarQube : ${e.getMessage()}"
                        }
                    }
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
                    try {
                        sh "docker build -t ${REGISTRY}/${APP_NAME}:backend-${env.BRANCH_NAME} -f ${DOCKERFILE_BACKEND} ./backend"
                    } catch (Exception e) {
                        error "Échec de la construction de l'image backend : ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    try {
                        sh "docker build -t ${REGISTRY}/${APP_NAME}:frontend-${env.BRANCH_NAME} -f ${DOCKERFILE_FRONTEND} ./frontend"
                    } catch (Exception e) {
                        error "Échec de la construction de l'image frontend : ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    try {
                        docker.withRegistry('', "${DOCKER_CREDENTIALS}") {
                            sh "docker push ${REGISTRY}/${APP_NAME}:backend-${env.BRANCH_NAME}"
                            sh "docker push ${REGISTRY}/${APP_NAME}:frontend-${env.BRANCH_NAME}"
                        }
                    } catch (Exception e) {
                        error "Échec du push des images Docker : ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Deploy to Environment') {
            steps {
                script {
                    try {
                        sh """
                            docker-compose -p ${NAMESPACE} -f ${DOCKER_COMPOSE_FILE} up -d --build
                        """
                    } catch (Exception e) {
                        error "Échec du déploiement sur l'environnement ${env.BRANCH_NAME} : ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Cleanup (Optional)') {
            when {
                expression { return false } // Par défaut désactivé, activable manuellement
            }
            steps {
                script {
                    try {
                        sh "docker-compose -p ${NAMESPACE} -f ${DOCKER_COMPOSE_FILE} down"
                    } catch (Exception e) {
                        echo "Échec de la suppression des containers Docker : ${e.getMessage()}"
                    }
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
