# Cách apply custom filter cho Spring Security

Theo mặc định, khi cài đặt Spring Security sẽ tự động thêm một số lớp **Filter Chain** của nó, khiến cho mọi request đến controller đều bị chặn.

![img](../images/spring-security.png)

Để override hành động này, chúng ta sẽ cần định nghĩa một Bean có kiểu dữ liệu **SecurityFilterChain**, từ đó cho phép chúng ta tự thiết lập chuỗi security của riêng mình.

```java
package nlu.com.app.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        return http.build();
    }
}
```
- Đoạn code này giúp định nghĩa lại chuỗi luật sẽ áp dụng.
