package com.ssafy.D204.webSocket;

import lombok.Getter;
import org.springframework.security.core.Authentication;

import javax.security.auth.Subject;
import java.security.Principal;

@Getter
class StompPrincipal implements Principal {
    String name;
    StompPrincipal(String name) {
        this.name = name;
    }

}