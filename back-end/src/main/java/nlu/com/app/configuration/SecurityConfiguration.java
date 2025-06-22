package nlu.com.app.configuration;

import java.util.List;
import lombok.RequiredArgsConstructor;
import nlu.com.app.exception.GlobalExceptionFilter;
import nlu.com.app.security.CustomAuthenticationProvider;
import nlu.com.app.security.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final CustomAuthenticationProvider customAuthenticationProvider;
  private final JwtFilter jwtFilter;
  private final GlobalExceptionFilter globalExceptionFilter;

  @Bean
  public AuthenticationManager authenticationManager() {
    return new ProviderManager(List.of(customAuthenticationProvider));
  }

  @Bean
  public SecurityFilterChain configure(HttpSecurity http) throws Exception {
    return http
        .cors(cors -> {})
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(
                "/api/v1/auth/register",
                "/api/v1/auth/login",
                "/api/v1/file/upload",
                "/api/book/**",
                "/api/orders/*/status",
                "/api/orders/*/timeline",
                "/api/category/**",
                "/api/review/*/overall",
                "/api/promotion/*"
            )
            .permitAll()
            .requestMatchers(
                    "/admin/api/book/*",
                    "/admin/api/order",
                    "/admin/api/order/*",
                    "/admin/api/promotion/*",
                    "/admin/api/chart/*",
                    "/admin/api/user/*")
                .hasAuthority("ADMIN")
            .anyRequest().authenticated()
        )
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(globalExceptionFilter, jwtFilter.getClass())
        .build();
  }


  @Bean
  public AuthenticationManager customizer(AuthenticationConfiguration configuration)
      throws Exception {
    return configuration.getAuthenticationManager();
  }
}
