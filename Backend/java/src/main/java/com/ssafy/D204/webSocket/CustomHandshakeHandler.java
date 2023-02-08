package com.ssafy.D204.webSocket;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.UUID;

class CustomHandshakeHandler extends DefaultHandshakeHandler {
    @Override
    protected Principal determineUser(ServerHttpRequest request,
                                      WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        
        // 비로그인 유저면 랜덤 ID 식별자를 부여
        StompPrincipal result = new StompPrincipal(UUID.randomUUID().toString());
        //로그인 유저면 고유 userName 필드 값으로 부여
        try {
            System.out.println(request.getBody());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        System.out.println(request.getPrincipal());
        System.out.println(request.getHeaders());
        System.out.println(attributes);

        System.out.println(wsHandler);

        System.out.println(request.getLocalAddress());
        System.out.println(request.getMethodValue());
        System.out.println(wsHandler.supportsPartialMessages());
        return result;
    }
}