package com.ssafy.D204.webSocket;


import com.ssafy.D204.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.ssafy.D204.domain.User;
import java.util.List;
@Controller
public class MessageController {

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
        return message;
    }

    // Mapped as /app/private
    @MessageMapping("/private")
    public void sendToSpecificUser(@Payload Message message) {
        List users = userRepository.findByIsActiveTrue();
        System.out.println(users);
        for (Object u: users){
            System.out.println(u);
        }
        simpMessagingTemplate.convertAndSendToUser(message.getFrom(), "/specific", message);
        simpMessagingTemplate.convertAndSendToUser(message.getFrom(), "/specific", message);
    }

//    @MessageMapping("/private")
//    public void sendToAllLoginedUsers(@Payload Message message) {
//        System.out.println(message.getText());
//        simpMessagingTemplate.convertAndSend("/loged-in", message);
////    }

}