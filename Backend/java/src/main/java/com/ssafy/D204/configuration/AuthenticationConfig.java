package com.ssafy.D204.configuration;

import com.ssafy.D204.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
@Configuration
@EnableWebSecurity //이걸 넣으면 스프링이 모든 api에 인증이 필요하다고 설정함
@RequiredArgsConstructor
public class AuthenticationConfig {

    private final UserService userService;
    @Value("${jwt.secret}")
    private String secretKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        System.out.println("In SecurityFilterChain");
        System.out.println("In SecurityFilterChain"+SecurityContextHolder.getContext());

        return httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .cors()
                .and()
                .authorizeRequests()
                .antMatchers("/api/users/login","/api/users/join").permitAll() //이 두 요청은 언제나 가능
                .antMatchers(HttpMethod.GET,"login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/v1/reviews").hasAuthority("ADMIN")
                //websocket
                .mvcMatchers("/","/ws/**").permitAll()


                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //jwt사용하는 경우 씀
                .and()
                .addFilterBefore(new JwtFilter(userService,secretKey), UsernamePasswordAuthenticationFilter.class)
                //받은 토큰을 가지고 제한을 풀어준다 // 제한을 풀려면 secretKey가 있어야함

                //websocket
//                .formLogin()
//                .and()
                .build();

    }


}
