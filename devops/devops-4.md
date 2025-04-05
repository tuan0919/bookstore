## Jenkins CI/CD

Bên cạnh **[Gitlab CI/CD](./devops-3.md#gitlab-cicd)** thì trên thực tế các doanh nghiệp cũng rất hay dùng Jenkins Server để quản lý CI/CD. Thế nên việc tìm hiểu Jenkins bên cạnh Gitlab CI/CD cũng rất quan trọng trong lĩnh vực DevOps.

### Chuẩn bị

- Một máy ảo gitlab hoặc 1 github repo có sẵn project để thực hành.
- Một máy ảo / VPS để cài Jenkins Server.

### Cài đặt jenkins server

Nhập đoạn script sau để cài đặt Jenkins:

```shell
#!/bin/bash

apt install openjdk-17-jdk openjdk-17-jre -y
java --version
wget -p -O - https://pkg.jenkins.io/debian/jenkins.io.key | apt-key add -
sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 5BA31D57EF5975CA
apt-get update
apt install jenkins -y
systemctl start jenkins
```

Mặc định thì Jenkins sẽ serve tại port 8080, nhưng vì chúng ta cài riêng một server dành cho Jenkins, cho nên chúng ta sẽ dùng **Reverse Proxy** để điều hướng truy cập đến port 8080 bằng Nginx.

```shell
apt install nginx
vi /etc/nginx/conf.d/jenkins.anhtuan.online.conf
```

```shell
server {
    listen 80;
    server_name jenkins.anhtuan.online;

    location / {
        proxy_pass http://localhost:8080;  # Chuyển hướng request tới Jenkins
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Tăng timeout để tránh lỗi timeout khi build
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
        proxy_read_timeout 300;

        # WebSocket support (nếu Jenkins cần)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }

    # Giảm rủi ro bảo mật
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options nosniff;
}
```

Sau khi đăng nhập vào giao diện Jenkins, tiến hành cài các plugins mặc định

![img_28.png](img_28.png)

Sau khi cài đặt xong Jenkins, thì thư mục home của nó là **/var/lib/jenkins**, đồng thời jenkins cũng tạo một user tương ứng cho nó là **jenkins**.

Có nhiều tùy chọn để thao tác tại trang dashboard, nhưng hiện tại quan trọng nhất sẽ là phần **Nodes**, đây là nơi chúng ta quản lý và thêm jenkins agent vào server.

- Theo cách thông thường thì Jenkins sẽ ssh tới máy host và tiến hành deploy tại đó, nhưng SSH là kết nối ngang hàng cho nên đây có thể xem là một cách tiếp cận rủi ro.
- Một cách tiếp cận khác khuyến khích sử dụng hơn là chúng ta sẽ đăng ký các Jenkins agent, các Jenkins agent này sẽ đc cài đặt ở máy host và sẽ tự dộng đăng ký chính nó với Jenkins Server.
- Jenkins agent sẽ "nhận lệnh" từ server và tiến hành triển khai dự án.

![img_29.png](img_29.png)

Cách tiếp cận của chúng ta sẽ là: **Jenkins Server** là nơi quản lý Pipeline, không phải là nơi triển khai dự án.

### Cài đặt Jenkins agent

Trước khi cài đặt Jenkins agent thì chúng ta cần phải đảm bảo nó có cùng phiên bản với Jenkins server.

Tiếp theo, tạo một user jenkins trên server sẽ cài jenkins agent (server host)

Tiếp theo, tạo một node trên màn hình dashboard của jenkins server

![img_30.png](img_30.png)

Nhập **Remote root directory** là **/var/lib/jenkins**, phải đảm bảo thư mục này cũng đã tồn tại trên server host, nếu chưa có thì tạo với lệnh mkdir.

Vì agent cần phải đi vào jenkins server, cho nên tại jenkins server chúng ta cần phải setup một inbound rule tại một port nào đó để cho phép jenkins agent có thể đi vào.

![img_31.png](img_31.png)

Các trường còn lại có thể để mặc định.

Sau khi thiết lập xong node, bấm vào để chuyển sang trang hướng dẫn cài đặt jenkins agent tương ứng tại host server.

![img_32.png](img_32.png)

Tại đây jenkins sẽ generate sẵn cho chúng ta các câu lệnh để paste vào mà không cần phải tự tay nhập.

![img_33.png](img_33.png)

Lưu ý, trước khi paste câu lệnh vào server host thì chúng ta nên chuyển sang user jenkins, vì câu lệnh này sẽ cài đặt một số công cụ nhất định, nên best practice là quyền truy cập các công cụ này nên thuộc về bản thân user jenkins.

Sau khi agent kết nối thành công, chúng ta sẽ tiến hành tạo pipeline

![img_34.png](img_34.png)

Tiếp theo, chúng ta tải thêm hai plugin **Gitlab** và **BlueOcean** về.

![img_35.png](img_35.png)

Tiếp theo vào **Manage Jenkins** > **System** và tìm phần kết nối với Gitlab

![img_36.png](img_36.png)

- Connection name: đặt bất kỳ.
- Gitlab Host URL: paste link gitlab vào field này.

Còn phần Credentials thì cần điều chỉnh một tí tại Gitlab, cụ thể chúng ta sẽ tạo một API Token bằng tài khoản admin, API Token này sẽ cho phép Jenkins được phép truy cập vào Gitlab

Best practice thì chúng ta sẽ tạo một user mới có quyền admin cho Jenkins, sau đó jenkins server sẽ truy cập gitlab project với access token của user này.

Đầu tiên, tạo user jenkins với quyền admin

![img_37.png](img_37.png)

Tiếp theo, đăng nhập lại vào Gitlab với user Jenkins vừa tạo rồi tạo access token cho user này.

![img_38.png](img_38.png)

Cuối cùng, quay lại màn hình Jenkins để nhập thông tin API Token

![img_39.png](img_39.png)

Sau đó, quay lại màn hình cấu hình jenkins pipe line sẽ thấy thông tin cấu hình kết nối gitlab phía trên được hiển thị

![img_40.png](img_40.png)

Tại mục **Triggers**, có thể tích chọn tùy chọn "Build when a change is pushed to GitLab" để thực hiện chạy pipeline này mỗi khi có thay đổi trên gitlab.

Tại **Pipeline**, chọn "Pipeline script from SCM" sau đó chọn "Git", nhập các thông tin về Repository URL và Credentials sẽ dùng để đăng nhập (Credentials sẽ dùng Username và Password của jenkins user đã tạo trên Gitlab).

![img_41.png](img_41.png)

Cuối cùng, sau khi thiết lập xong Pipeline thì sẽ cấu hình thêm phần Webhooks bên Gitlab để cho Jenkins Server có thể nhận thấy thay đổi trên dự án.

Đường dẫn của Webhooks sẽ có format như sau:

```shell
http://<user_trên_jenkins>:<token_user_trên_jenkins>@<địa_chỉ_jenkins>/project/<đường_dẫn_dự_án_trên_jenkins>

https://admin:11756872d5eee42d55668b373644901b6d@jenkins.anhtuan.online/project/lab-server
```

Sau khi thêm xong các field cần thiết có thể tiến hành Add Webhook r thêm một push event để test.

![img_42.png](img_42.png)

Pipeline đầu tiên chắc chắn sẽ bị lỗi do chúng ta chưa add Jenkinsfile trên dự án tại Gitlab, Jenkinsfile về cơ bản sẽ là một bản hướng dẫn cho Jenkins agent các bước để tiến hành pipeline.

Jenkinsfile syntax sử dụng ngôn ngữ lập trình Groovy.

Chúng ta tiến hành thêm file Jenkinsfile sau vào dự án:

```groovy
pipeline {
    agent {
        label 'lab-server'
    }
    stages {
        stage('info') {
            steps {
                sh(script: """ whoami;pwd;ls -la""", label: "first stage")
            }
        }
    }
}
```

Kiểm tra với Pipeline trên với Open BlueOcean

![img_43.png](img_43.png)

Script hoàn chỉnh như sau:

```groovy
pipeline {
    agent { label 'lab-server' }

    environment {
        REGISTRY_URL = 'harbor.anhtuan.online'
        REGISTRY_USER = 'admin'
        REGISTRY_PASSWD = 'Harbor12345'
        CI_PROJECT_NAME = 'shoeshop'
        DOCKER_CONTAINER = 'shoeshop'
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

        stage('Init') {
            steps {
                script {
                    env.CI_COMMIT_TAG = sh(script: "git describe --tags --exact-match || echo latest", returnStdout: true).trim()
                    env.CI_COMMIT_SHORT_SHA = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    env.DOCKER_IMAGE = "${REGISTRY_URL}/${CI_PROJECT_NAME}/${CI_COMMIT_TAG}:${CI_COMMIT_SHORT_SHA}"

                    echo "Tag: ${CI_COMMIT_TAG}"
                    echo "Image: ${DOCKER_IMAGE}"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh """
                        echo "${REGISTRY_PASSWD}" | docker login ${REGISTRY_URL} -u ${REGISTRY_USER} --password-stdin
                        docker build -t ${DOCKER_IMAGE} .
                        docker push ${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        docker pull ${DOCKER_IMAGE}
                        docker rm -f ${DOCKER_CONTAINER} || true
                        docker run --name ${DOCKER_CONTAINER} -d -p 18181:8080 ${DOCKER_IMAGE}
                    """
                }
            }
        }

        stage('Show Logs') {
            steps {
                script {
                    sh """
                        sleep 10
                        docker logs ${DOCKER_CONTAINER}
                    """
                }
            }
        }
    }
}
```