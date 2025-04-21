pipeline {
    agent { label 'bookstore-agent' }

    environment {
        dockerFile = 'docker-compose.production.yaml'
        projectUser = 'bookstore'
        executeCommand = 'sudo su bookstore -c'
        loadEnv = 'source ~/.my_env'
        compose = 'docker compose'
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
                        ${executeCommand} "${loadEnv} && ${compose} -f ${dockerFile} build"
                    """
                }
            }
        }

        stage('Deploy') {
            when {
                expression { return env.GIT_BRANCH == 'origin/main' }
            }
            steps {
                script {
                    sh """
                        ${executeCommand} "${loadEnv} && ${compose} -f ${dockerFile} down -v"
                        ${executeCommand} "${loadEnv} && ${compose} -f ${dockerFile} up -d"
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
                    ['mysql', 'springboot', 'nginx'].each { container ->
                        echo "Showing logs for container ${container}"
                        sh "${executeCommand} \"${loadEnv} && docker logs ${container}\""
                    }
                }
            }
        }
    }
}
