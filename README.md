# Wibu BookStore

## Giới thiệu
Wibu BookStore là một ứng dụng webapp được xây dựng với chủ đề là một thương hiệu bán lẻ sách Nhật Bản. Hệ thống cung cấp các tính năng cần thiết trong một nền tảng bán lẻ, bao gồm: Đăng nhập, Đăng ký, Cổng thanh toán online, Quản lý sản phẩm, Quản lý đơn hàng, Quản lý khiếu nại, Thống kê doanh thu, ... Hệ thống được thiết kế theo kiến trúc tách biệt giữa Client và Server.

Hệ thống hướng đến việc xây dựng một ứng dụng sát với môi trường thực tế bằng cách deploy lên các máy chủ VPS cũng như sẽ có một quy trình CI/CD đơn giản để phát triển phần mềm liên tục.

## Kiến trúc hệ thống

### Tổng quan
Hệ thống tuân theo kiến trúc tách biệt (Decoupled Architecture), trong đó frontend và backend được triển khai riêng biệt và giao tiếp với nhau thông qua RESTful APIs. Hệ thống sử dụng Docker để container hóa, Jenkins cho quy trình CI/CD, và Cloudflare để tăng cường bảo mật cũng như hiệu suất.

![demo-architecture](https://github.com/user-attachments/assets/42cee8c5-727e-44b6-abfa-2a2f37b18968)


## Thành phần hệ thống

### Frontend
- **Công nghệ sử dụng**: React
- **Tên miền**: `https://front-end.anhtuan.online`
  
### Backend
- **Công nghệ sử dụng**: Spring Boot, MySQL
- **Tên miền**: `https://back-end.anhtuan.online`
- **Cơ sở dữ liệu**: MySQL để lưu trữ dữ liệu

### CI/CD
- **Jenkins** được sử dụng để tự động triển khai
- Lấy mã nguồn từ nhánh `/main` trên GitHub
- Thực thi các script build và deploy container cho cả frontend và backend.

### Reverse Proxy
- Sử dụng **Nginx** như một trình proxy ngược để serve tài nguyên front-end đến khách hàng.
- Nginx sẽ chuyển hướng các request đến các host khác nhau trong máy dựa vào tên miền.
- Tích hợp TLS để tăng cường bảo mật.

### Mạng & Bảo mật
- **Cloudflare** được sử dụng để tăng cường bảo mật và cải thiện hiệu suất
- Các tên miền của hệ thống được proxy qua Cloudflare để chống DDoS và tăng tính bảo mật.
- Kích hoạt tính năng **Full SSL Strict** để mã hóa truy cập cả hai chiều: **client -> frontend** và **cloudflare -> server**.
- Sử dụng Certbot để lấy chứng chỉ miễn phí từ Let's Encrypt.

## Quy trình triển khai
1. Developer đẩy code lên GitHub (`main` branch)
2. Github Webhook gửi một sự kiện đến máy chủ **Clouflare Proxy**.
3. Clouflare pass yêu cầu này đến **Jenkins Server**.
4. Jenkins Server tạo một job mới và invoke Jenkins agent tại máy chủ production hoạt động.
5. Jenkins Agent pull code, deploy phiên bản mới của ứng dụng ngay tại máy chủ production.

## Định hướng phát triển
- Triển khai Kubernetes để quản lý hệ thống tốt hơn
- Bổ sung lớp caching (ví dụ: Redis) để cải thiện hiệu suất
- Phát triển thêm tính năng cho hệ thống và sử dụng thêm các API cổng thanh toán

