#!/bin/sh

JENKINS_URL="http://host.docker.internal:8080"
AGENT_NAME="front-end"
JENKINS_USER="admin"
JENKINS_TOKEN="admin"

echo "---> Lấy secret key từ Jenkins..."
SECRET_KEY=$(curl -s -u "$JENKINS_USER:$JENKINS_TOKEN" \
    "$JENKINS_URL/computer/$AGENT_NAME/slave-agent.jnlp" \
    | grep -oP '(?<=<argument>)[a-f0-9]{64}(?=</argument>)' | head -n 1)

echo "🔑 Secret Key: $SECRET_KEY"

echo "---> Kiểm tra file $AGENT_JAR..."
if [ ! -f "$AGENT_JAR" ]; then
    echo "---> Tải xuống $AGENT_JAR từ Jenkins..."
    curl -sO "$JENKINS_URL/jnlpJars/agent.jar"
fi

echo "---> Khởi động Agent..."
java -jar agent.jar -url "$JENKINS_URL" -secret "$SECRET_KEY" -name "$AGENT_NAME" -webSocket -workDir "/home/jenkins/agent"
