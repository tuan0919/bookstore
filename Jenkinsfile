pipeline {
    agent { label 'bookstore-agent' }

    environment {
        dockerFile = 'docker-compose.production.yaml'
        projectUser = 'bookstore'
    }

    stages {
        stage('Show info') {
            when {
                expression { return env.GIT_BRANCH == 'origin/main' }
            }
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
            when {
                expression { return env.GIT_BRANCH == 'origin/main' }
            }
            steps {
                script {
                    sh """
                        sudo su bookstore -c "docker compose -f ${dockerFile} build"
                    """
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
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
            when {
                expression { return env.GIT_BRANCH == 'origin/main' }
            }
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
}
