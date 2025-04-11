pipeline {
    agent {
        docker {
            image 'node:20.19.0'
            args '-v $PWD:/app'  // Si tu veux monter le volume du workspace Jenkins
        }
    }

    environment {
        // 🛠️ Docker
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
                    ['backend', 'frontend'].each { module ->
                        dir(module) {
                            sh 'npm install'
                            // sh 'npm run test -- --coverage --coverageReporters=lcov'
                            sh 'npm run build'
                        }
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
        }

    //    stage('Test Backend & Build Backend + Frontend (Docker)') {
    //         steps {
    //             script {
    //                 def backendContainer = "tiptop_backend"
    //                 def frontendContainer = "tiptop_frontend"
        
    //                 try {
    //                     echo "🧪 Lancement des tests backend avec coverage"
    //                     sh "docker exec ${backendContainer} npm install"
    //                     sh "docker exec ${backendContainer} npm run test -- --coverage --coverageReporters=lcov"
        
    //                     echo "📦 Build du backend"
    //                     sh "docker exec ${backendContainer} npm run build"
        
    //                     echo "🎨 Build du frontend"
    //                     sh "docker exec ${frontendContainer} npm install"
    //                     sh "docker exec ${frontendContainer} npm run build"
    //                 } catch (err) {
    //                     echo "❌ Une erreur est survenue : ${err}"
    //                     currentBuild.result = 'FAILURE'
    //                     error("Échec pendant test/build backend ou frontend")
    //                 }
        
    //                 echo "📤 Copie du rapport de coverage backend depuis le conteneur"
    //                 // Montre le dossier de coverage vers l’hôte via Docker volume si ce n’est pas déjà fait
    //                 sh "docker cp ${backendContainer}:/app/coverage ./backend_coverage"
        
    //                 echo "📊 Publication du rapport coverage dans Jenkins"
    //                 publishHTML(target: [
    //                     reportName: "Backend Coverage",
    //                     reportDir: "backend_coverage/lcov-report",
    //                     reportFiles: 'index.html',
    //                     keepAll: true,
    //                     allowMissing: true,
    //                     alwaysLinkToLastBuild: true
    //                 ])
    //             }
    //         }
    //     }


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
