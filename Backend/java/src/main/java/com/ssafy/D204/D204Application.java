package com.ssafy.D204;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class D204Application {

	public static void main(String[] args) {
		SpringApplication.run(D204Application.class, args);
	}

//	@Bean
//	public UserDetailsService users(){
//		UserDetails user = User.builder()
//				.username("user")
//				.password("{noop}password")
//				.roles("USER")
//				.build();
//
//		UserDetails admin = User.builder()
//				.username("admin")
//				.password("{noop}password")
//				.roles("USER","ADMIN")
//				.build();
//
//		return new InMemoryUserDetailsManager(user,admin);
//	}
}
