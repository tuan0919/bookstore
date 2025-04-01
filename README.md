# Wibu BookStore

## Giới thiệu
Wibu BookStore là một ứng dụng webapp được xây dựng với chủ đề là một thương hiệu bán lẻ sách Nhật Bản. Hệ thống cung cấp các tính năng cần thiết trong một nền tảng bán lẻ, bao gồm: Đăng nhập, Đăng ký, Cổng thanh toán online, Quản lý sản phẩm, Quản lý đơn hàng, Quản lý khiếu nại, Thống kê doanh thu, ... Hệ thống được thiết kế theo kiến trúc tách biệt giữa Client và Server.

Hệ thống hướng đến việc xây dựng một ứng dụng sát với môi trường thực tế bằng cách giả lập qua Docker.

## Kiến trúc hệ thống

### Tổng quan
Hệ thống tuân theo kiến trúc tách biệt (Decoupled Architecture), trong đó frontend và backend được triển khai riêng biệt và giao tiếp với nhau thông qua RESTful APIs. Hệ thống sử dụng Docker để container hóa, Jenkins cho quy trình CI/CD, và Cloudflare để tăng cường bảo mật cũng như hiệu suất.

![demo-architecture](https://github.com/user-attachments/assets/5b36993a-2714-41e1-b66f-e80a263bbc0d)


## Thành phần hệ thống

### Frontend
- **Công nghệ sử dụng**: React, Nginx
- **Triển khai**: Chạy bên trong một container Docker thuộc `front-end-network`
- **Tên miền**: `https://front-end.anhtuan.online`
- **Reverse Proxy**: Nginx phục vụ ứng dụng React và chuyển tiếp các yêu cầu API đến backend

### Backend
- **Công nghệ sử dụng**: Spring Boot, MySQL
- **Triển khai**: Chạy bên trong một container Docker thuộc `back-end-network`
- **Tên miền**: `https://back-end.anhtuan.online`
- **Cơ sở dữ liệu**: MySQL để lưu trữ dữ liệu

### CI/CD
- **Jenkins** được sử dụng để tự động triển khai
- Lấy mã nguồn từ nhánh `main` trên GitHub
- Thực thi các script `ssh + rebuild` cho cả frontend và backend
- Hỗ trợ triển khai theo lịch trình

### Mạng & Bảo mật
- **Cloudflare** được sử dụng để tăng cường bảo mật và cải thiện hiệu suất
- Backend và frontend giao tiếp qua mạng riêng trong Docker
- Hệ thống có các dịch vụ lưu trữ và CDN:
  - **Lưu trữ**: `http://storage.anhtuan.online`
  - **CDN**: `http://cdn.anhtuan.online`

## Quy trình triển khai
1. Developer đẩy code lên GitHub (`main` branch)
2. Jenkins kích hoạt quy trình build
3. Hệ thống kết nối đến server qua SSH và tiến hành rebuild các container Docker tương ứng
4. Ứng dụng cập nhật và được phục vụ thông qua Cloudflare

## Phát triển cục bộ
- Hệ thống có thể được truy cập qua `http://localhost` để kiểm thử trước khi triển khai
- Docker networks được sử dụng để cô lập các dịch vụ, đảm bảo bảo mật và khả năng mở rộng

## Định hướng phát triển
- Triển khai Kubernetes để quản lý hệ thống tốt hơn
- Bổ sung lớp caching (ví dụ: Redis) để cải thiện hiệu suất
- Hỗ trợ API GraphQL để cung cấp truy vấn dữ liệu linh hoạt hơn

