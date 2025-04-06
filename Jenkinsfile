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
                        sudo su ${projectUser} -c "docker compose -f ${dockerFile} build"
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        sudo su ${projectUser} -c "docker compose -f ${dockerFile} down -v"
                        sudo su ${projectUser} -c "docker compose -f ${dockerFile} up -d"
                    """
                }
            }
        }

        stage('Show Logs') {
            steps {
                script {
                    // Lấy danh sách các container Docker đang chạy
                    def containers = sh(script: "docker ps -q", returnStdout: true).trim().split("\n")

                    // Kiểm tra nếu có container đang chạy
                    if (containers.size() > 0) {
                        // Duyệt qua các container và in log ra màn hình
                        containers.each { containerId ->
                            echo "Showing logs for container ID: ${containerId}"
                            sh "docker logs ${containerId} --tail 100"  // Lấy 100 dòng cuối của log từ mỗi container
                        }
                    } else {
                        echo "No containers are currently running."
                    }
                }
            }
        }
    }
}
