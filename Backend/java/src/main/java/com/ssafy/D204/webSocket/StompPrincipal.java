package com.ssafy.D204.webSocket;

import lombok.Getter;
import org.springframework.security.core.Authentication;

import javax.security.auth.Subject;
import java.security.Principal;

@Getter
class StompPrincipal implements Principal {
    String name;
    Authentication authentication;
    StompPrincipal(String name) {
//        this.name = authentication.getName();
//        System.out.println(authentication.getName());
        System.out.println("StompPrincipal : " + name);
        this.name = name;
    }

}