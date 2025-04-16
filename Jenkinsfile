pipeline {
    agent {
        docker {
            image 'node:20.19.0'
            args '-v $PWD:/app'
        }
    }

    environment {
        DOCKER_REGISTRY = 'docker.io'
        BACKEND_IMAGE_NAME = "${DOCKER_REGISTRY}/asquare25/thetiptop"
        FRONTEND_IMAGE_NAME = "${DOCKER_REGISTRY}/asquare25/thetiptop"
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
                            cache(path: "${env.WORKSPACE}/.npm", key: "npm-cache-${module}", restoreKeys: ["npm-cache-"]) {
                                sh 'npm install'
                            }

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
                    sh """
                        npx sonar-scanner \
                            -Dsonar.projectKey=tiptop-backend \
                            -Dsonar.sources=./backend \
                            -Dsonar.host.url=https://www.sonarqube.dsp5-archi-f24a-15m-g8.fr \
                            -Dsonar.login=${SONAR_TOKEN} \
                            -Dsonar.javascript.lcov.reportPaths=backend/coverage/lcov.info || true
                    """
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

                        writeFile file: '/tmp/id_rsa_jenkins', text: SSH_KEY
                        sh """
                            chmod 600 /tmp/id_rsa_jenkins

                            # Copie le script deploy.sh sur le serveur distant
                            scp -i /tmp/id_rsa_jenkins -o StrictHostKeyChecking=no deployment/deploy.sh \${SSH_USER}@161.97.76.223:${remotePath}/deploy.sh

                            # Exécute le script à distance
                            ssh -i /tmp/id_rsa_jenkins -o StrictHostKeyChecking=no \${SSH_USER}@161.97.76.223 '
                                chmod +x ${remotePath}/deploy.sh &&
                                ${remotePath}/deploy.sh
                            '

                            rm -f /tmp/id_rsa_jenkins
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
