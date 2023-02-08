package com.ssafy.D204.webSocket;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

class CustomHandshakeHandler extends DefaultHandshakeHandler {
    @Override
    protected Principal determineUser(ServerHttpRequest request,
                                      WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {

        StompPrincipal result = new StompPrincipal(UUID.randomUUID().toString());
        System.out.println("request getPrincipal : "+request.getPrincipal());
        System.out.println(wsHandler);
        System.out.println(wsHandler.supportsPartialMessages());
        System.out.println("result.getName() : " + result.getName());

        return result;
    }
}