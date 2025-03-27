pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *') // Kiểm tra Git mỗi 1 phút
    }

    environment {
        IMAGE_NAME = 'react-app-image'
        CONTAINER_NAME = 'react-app'
        FRONTEND_DIR = './front-end'
        DOCKERFILE = 'Dockerfile.react'
        NETWORK_NAME = 'frontend-network'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'feature/add-jenkins-pipeline', url: 'https://github.com/tuan0919/bookstore.git'
            }
        }

        stage('Build Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} -f ${FRONTEND_DIR}/${DOCKERFILE} ${FRONTEND_DIR}"
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Kiểm tra nếu container đang chạy thì dừng trước
                    sh """
                    if [ \$(docker ps -q -f name=${CONTAINER_NAME}) ]; then
                        docker stop ${CONTAINER_NAME}
                    fi
                    """

                    // Chạy container mới
                    sh """
                    docker run --name ${CONTAINER_NAME} \\
                        --rm -d \\
                        --publish 3000:80 \\
                        --volume \$(pwd)/front-end/dist:/app/dist \\
                        --network ${NETWORK_NAME} \\
                        --workdir /app \\
                        ${IMAGE_NAME}
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment thành công!'
        }
        failure {
            echo '❌ Deployment thất bại, kiểm tra lỗi trong logs.'
        }
    }
}
