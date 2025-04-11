pipeline {
    agent none

    environment {
        // Variables Globales
        DOCKER_REGISTRY = 'docker.io' // Ton nom d'utilisateur Docker Hub
        BACKEND_IMAGE_NAME = "${DOCKER_REGISTRY}/tiptop-backend"
        FRONTEND_IMAGE_NAME = "${DOCKER_REGISTRY}/tiptop-frontend"
        BRANCH_NAME = "${env.BRANCH_NAME}"
        BACKEND_CONTAINER_NAME = "backend"
        FRONTEND_CONTAINER_NAME = "frontend"
        SONARQUBE_URL = 'https://sonarqube.dsp5-archi-f24a-15m-g8.fr'
        SONARQUBE_TOKEN = credentials('sonarqube-token-last')
    }

    tools {
        nodejs 'NodeJS' // Définir l'environnement NodeJS
    }

    stages {

        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent parallel: true
            failFast true
            stages {
                stage('Backend Dependencies') {
                    agent {
                        docker {
                            image 'node:16'
                            args '-v $PWD:/app'  // Montée du volume avec le répertoire racine
                        }
                    }
                    steps {
                        dir('backend') {
                            sh '''
                                npm install
                            '''
                        }
                    }
                }

                stage('Frontend Dependencies') {
                    agent {
                        docker {
                            image 'node:16'
                            args '-v $PWD:/app -v frontend_node_modules:/app/node_modules'  // Montée du volume node_modules pour éviter la réinstallation
                        }
                    }
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            agent parallel: true
            failFast true
            stages {
                stage('Backend Tests') {
                    agent {
                        docker {
                            image 'node:16'
                            args '-v $PWD:/app'
                        }
                    }
                    steps {
                        dir('backend') {
                            sh 'npm run test -- --coverage --coverageReporters=lcov'
                        }
                    }
                    post {
                        always {
                            publishHTML(target: [
                                reportName: 'Backend Coverage Report',
                                reportDir: 'backend/coverage',
                                reportFiles: 'index.html',
                                keepAll: true,
                                allowMissing: true,
                                alwaysLinkToLastBuild: true
                            ])
                        }
                    }
                }

                stage('Frontend Tests') {
                    agent {
                        docker {
                            image 'node:16'
                            args '-v $PWD:/app -v frontend_node_modules:/app/node_modules'
                        }
                    }
                    steps {
                        dir('frontend') {
                            sh 'npm run test -- --coverage --coverageReporters=lcov'
                        }
                    }
                    post {
                        always {
                            publishHTML(target: [
                                reportName: 'Frontend Coverage Report',
                                reportDir: 'frontend/coverage',
                                reportFiles: 'index.html',
                                keepAll: true,
                                allowMissing: true,
                                alwaysLinkToLastBuild: true
                            ])
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            agent {
                docker {
                    image 'node:16'
                    args '-v /tmp:/tmp'
                }
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

        stage('Build') {
            agent parallel: true
            failFast true
            stages {
                stage('Build Frontend') {
                    agent {
                        docker {
                            image 'node:16'
                            args '-v $PWD:/app -v frontend_node_modules:/app/node_modules'
                        }
                    }
                    steps {
                        dir('frontend') {
                            sh 'npm run build'
                        }
                    }
                }

                stage('Build Backend') {
                    agent {
                        docker {
                            image 'node:16'
                            args '-v $PWD:/app'
                        }
                    }
                    steps {
                        dir('backend') {
                            echo "Backend Node.js - Express.js prêt à être déployé"
                        }
                    }
                }
            }
        }

        stage('Build and Push Docker Images') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            agent any
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        def backendImage = "${BACKEND_IMAGE_NAME}:${BRANCH_NAME}"
                        def frontendImage = "${FRONTEND_IMAGE_NAME}:${BRANCH_NAME}"

                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            docker build -t ${backendImage} ./backend
                            docker build -t ${frontendImage} ./frontend
                            docker push ${backendImage}
                            docker push ${frontendImage}
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression { ['develop', 'preprod', 'prod'].contains(env.BRANCH_NAME) }
            }
            agent any
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'ssh-credentials', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')]) {
                        sh '''
                            sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no "$SSH_USER@${env.SSH_HOST}" "
                              cd /opt/docker-compose &&
                              docker-compose pull &&
                              docker-compose up -d"
                        '''
                    }
                }
            }
        }

        stage('Cleanup') {
            agent any
            steps {
                sh 'docker system prune -f --volumes'
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH_NAME == 'prod') {
                    echo 'Pipeline prod terminé avec succès. Lancement du backup...'
                    sh './scripts/backup.sh'
                } else {
                    echo "✅ Pipeline terminée avec succès sur branche ${BRANCH_NAME}"
                }
            }
        }
        failure {
            echo "❌ Échec de la pipeline sur branche ${BRANCH_NAME}"
        }
        always {
            echo "📦 Fin d’exécution de la pipeline"
        }
    }
}
