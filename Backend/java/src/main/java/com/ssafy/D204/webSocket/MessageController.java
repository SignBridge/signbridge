package com.ssafy.D204.webSocket;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    // Mapped as /app/application
    @MessageMapping("/application")
    @SendTo("/all/messages")
    public Message send(final Message message) throws Exception {
        return message;
    }

    // Mapped as /app/private
    @MessageMapping("/private")
    public void sendToSpecificUser(@Payload Message message) {
        System.out.println(message.getTo());
        System.out.println(message.getText());
        //이부분 getTo에 해당 메세지를 전달할 유저들을 넣으면 될 것 같다
        simpMessagingTemplate.convertAndSendToUser(message.getTo(), "/specific", message);
        //message.getTo()는 the identifier for the user
        //두번째 destination은 destination to send the message to
    }

//    @MessageMapping("/private")
//    public void sendToAllUsers(@Payload Message message) {
//        System.out.println(message.getText());
//        simpMessagingTemplate.convertAndSend("/specific", message);
//    }

}