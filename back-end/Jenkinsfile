pipeline {
    agent { label 'bookstore-agent' }

    environment {
        dockerFile = 'docker-compose.production.yaml'
        projectUser = 'bookstore'
    }

    stages {
        stage('Show info') {
            steps {
                script {
                    sh """
                        whoami
                        pwd
                        id
                        ls -la
                    """
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh """
                        sudo su bookstore -c "docker compose -f ${dockerFile} build"
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        sudo su bookstore -c "docker compose -f ${dockerFile} down -v"
                        sudo su bookstore -c "docker compose -f ${dockerFile} up -d"
                    """
                }
            }
        }

        stage('Show Logs') {
            steps {
                script {
                    echo "Showing logs for container mysql"
                    sh "docker logs mysql"

                    echo "Showing logs for container springboot"
                    sh "docker logs springboot"

                    echo "Showing logs for container nginx"
                    sh "docker logs nginx"
                }
            }
        }
    }

    triggers {
        gitPush {
            branches('main')
        }
    }
}
