pipeline {
    agent any

    triggers {
        pollSCM('H/1 * * * *') // Kiểm tra Git mỗi 1 phút
    }

    environment {
        COMPOSE_FILE = "docker-compose.yml"
        SERVICE_NAME = "react-app"
        NETWORK_NAME = "frontend-network"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/tuan0919/bookstore.git'
            }
        }

        stage('Check Railway CLI') {
            steps {
                sh 'which railway || echo "🚨 Railway CLI not found!"'
                sh 'echo $PATH'
            }
        }

        stage('Build and Start Container') {
            steps {
                sh """
                docker-compose -f ${COMPOSE_FILE} down
                docker-compose -f ${COMPOSE_FILE} build ${SERVICE_NAME}
                docker-compose -f ${COMPOSE_FILE} up -d ${SERVICE_NAME}
                """
            }
        }

        stage('Clean Up Old Images') {
            steps {
                sh "docker image prune -f"
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
