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
        SONAR_HOST_URL = 'https://www.sonarqube.dsp5-archi-f24a-15m-g8.fr'
        MONGO_DB_CONTAINER_NAME = 'mongo-test-container'
        MONGO_PORT = '27017'
        MONGO_URI = "mongodb://${MONGO_DB_CONTAINER_NAME}:${MONGO_PORT}/testdb"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('MongoDB Setup') {
            steps {
                script {
                    echo 'Démarrage de MongoDB dans un container Docker...'
                    sh """
                        docker ps -aq -f name=${MONGO_DB_CONTAINER_NAME} | xargs -r docker rm -f
                        docker run -d --name ${MONGO_DB_CONTAINER_NAME} -p ${MONGO_PORT}:${MONGO_PORT} mongo:latest
                    """
                }
            }
        }

        stage('Install, Test & Build') {
            steps {
                script {
                    ['backend', 'frontend'].each { module ->
                        dir(module) {
                            sh "mkdir -p ${NPM_CACHE_DIR}"
                            sh """
                                npm install --cache ${NPM_CACHE_DIR} --prefer-online
                            """
                            if (module == 'frontend') {
                                sh 'chmod -R +x node_modules/.bin'
                                withEnv(["CI=false"]) {
                                    sh 'npm run build'
                                }
                            } else {
                                echo "Pas de script build pour ${module}"
                            }
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    withSonarQubeEnv('SonarQube') {
                        script {
                            // Installer Java si nécessaire
                            sh '''
                                apt-get update && \
                                apt-get install -y openjdk-17-jdk && \
                                java -version
                            '''

                            // Analyse backend
                            dir('backend') {
                                sh '''#!/bin/bash
                                ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                                  -Dsonar.projectKey=tiptop-backend \
                                  -Dsonar.sources=. \
                                  -Dsonar.host.url=${SONAR_HOST_URL} \
                                  -Dsonar.token=$SONAR_TOKEN \
                                  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                  -Dsonar.sourceEncoding=UTF-8
                                '''
                            }

                            // Analyse frontend
                            dir('frontend') {
                                sh 'npm run test -- --coverage'
                                sh 'ls -l coverage/lcov.info || true'
                                sh '''#!/bin/bash
                                ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                                  -Dsonar.projectKey=tiptop-frontend \
                                  -Dsonar.sources=. \
                                  -Dsonar.host.url=${SONAR_HOST_URL} \
                                  -Dsonar.token=$SONAR_TOKEN \
                                  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                  -Dsonar.sourceEncoding=UTF-8
                                '''
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
                script {
                    echo 'Arrêt du container MongoDB...'
                    sh """
                        docker stop ${MONGO_DB_CONTAINER_NAME} && docker rm ${MONGO_DB_CONTAINER_NAME}
                    """
                    sh 'docker system prune -f --volumes'
                }
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
