package com.ssafy.D204.configuration;
import com.ssafy.D204.service.UserService;
import com.ssafy.D204.utiles.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

//문을 만들었는데 문을 여는 설정을 한거
//token이 있는지, 유효한지 필터링
@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter{

    String userName ="";

    private final UserService userService;
    private final String secretKey;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("authorization : {}",authorization);

        //token안보내면 Block
        if(authorization == null || !authorization.startsWith("Bearer ")){
            log.error("유효하지 않은 토큰");
            filterChain.doFilter(request,response);
            return;
        }

        // Token꺼내기
        String token = authorization.split(" ")[1];

        //Token 만료여부확인
        if (JwtUtil.isExpired(token,secretKey)){
            log.error("Token이 만료되었습니다.");
            filterChain.doFilter(request,response);
            return;
        }

        //UserName token 꺼내기
        String userName = JwtUtil.getUserName(token, secretKey);
        log.info("userName {}",userName);

        String role = JwtUtil.getUserRole(token,secretKey);
        log.info("role {}",role);

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(userName,null, List.of(new SimpleGrantedAuthority(role)));

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request,response);
        log.info("SecurityContextHolder {}",SecurityContextHolder.getContext());
        if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
            log.info("User has role ADMIN");
        } else {
            log.info("User does not have role ADMIN");
        }
    }
}
