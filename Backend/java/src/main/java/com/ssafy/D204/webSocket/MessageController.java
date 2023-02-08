package com.ssafy.D204.webSocket;


import com.ssafy.D204.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.ssafy.D204.domain.User;

import java.util.*;

@Controller
public class MessageController {

    static Map<String, String> translatorMap = new HashMap();
    static Queue userMap = new LinkedList();

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    private final UserRepository userRepository;

    public MessageController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Mapped as /app/application
    @MessageMapping("/application")
    @SendTo("/all/messages")
    public Message send(final Message message) throws Exception {

        if(message.getUsername()==null){
            userMap.add(message.getFrom());
        }else{
            translatorMap.put(message.getUsername(),message.getFrom());
        }

        System.out.println("translatorMap : "+translatorMap);
        return message;
    }

    // Mapped as /app/private


    // Mapped as /app/private
    @MessageMapping("/private")
    public void sendToSpecificUser(@Payload Message message) {

        List<User> users = userRepository.findByIsActiveTrue();
        System.out.println(users);

        System.out.println("message : "+message);
        System.out.println("translatorMaptranslatorMaptranslatorMap: "+translatorMap);
        for (User u : users){
            if (translatorMap.get(u.getUserName()) != null){
                System.out.println(translatorMap.get(u.getUserName()));
                System.out.println(11111+translatorMap.get(u.getUserName()));
                simpMessagingTemplate.convertAndSendToUser(translatorMap.get(u.getUserName()), "/specific", message);
            } else{
                System.out.println("no");
            }

        }

    }

//    @MessageMapping("/private")
//    public void sendToAllLoginedUsers(@Payload Message message) {
//        System.out.println(message.getText());
//        simpMessagingTemplate.convertAndSend("/loged-in", message);
////    }

}