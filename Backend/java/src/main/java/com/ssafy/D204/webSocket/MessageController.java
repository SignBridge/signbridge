package com.ssafy.D204.webSocket;


import com.ssafy.D204.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.ssafy.D204.domain.User;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Controller
public class MessageController {

    public static Map<String, String> translatorMap = new HashMap();
    public static Queue userMap = new LinkedList();

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    private final UserRepository userRepository;
    public MessageController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Mapped as /app/application

    @MessageMapping("/private")
    public void sendToSpecificUser(@RequestBody Map requestSessionIndentityMap) {

        String requestSessionIndentity = (String) requestSessionIndentityMap.get("sessionIdentity");
        System.out.println("requestSessionIndentity : "+requestSessionIndentity);
        List<User> users = userRepository.findByIsActiveTrue();
        System.out.println(users);
        for (User u : users){
            if (translatorMap.get(u.getUserName()) != null){
                System.out.println(translatorMap.get(u.getUserName()));
                System.out.println(11111+translatorMap.get(u.getUserName()));
                simpMessagingTemplate.convertAndSendToUser(translatorMap.get(u.getUserName()),
                        "/specific",
                        requestSessionIndentity
                        );
            } else{
                System.out.println("no");
            }
        }
    }
    @MessageMapping("/accept")
    public void accept(@RequestBody Map requestSessionIndentityMap){
        String requestSessionIndentity = (String) requestSessionIndentityMap.get("sessionIdentity");
        System.out.println(requestSessionIndentity);
        simpMessagingTemplate.convertAndSendToUser(requestSessionIndentity,"/specific","통역사가 요청을 수락했습니다");
    }
}