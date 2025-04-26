package nlu.com.app.exception;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Component
@RequiredArgsConstructor
public class GlobalExceptionFilter extends OncePerRequestFilter {
    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) {
        try {
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e1) {
            var convertedException = new ApplicationException(ErrorCode.JWT_EXPIRED);
            handlerExceptionResolver.resolveException(request, response, null, convertedException);
        }
        catch (Exception ex) {
            // Sử dụng HandlerExceptionResolver để chuyển hướng exception sang GlobalExceptionHandler
            ex.printStackTrace();
            handlerExceptionResolver.resolveException(request, response, null, ex);
        }
    }
}
