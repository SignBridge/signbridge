package com.ssafy.D204.controller;

import com.ssafy.D204.webSocket.MessageController;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LoginUserMappingIdentityUserNameController {

    @PostMapping("/mapping/login/user")
    public void LoginUserMappingIdentityUserName(@RequestBody Map data, Authentication authentication) throws Exception {
        System.out.println(data);
        String sessionIdentity = (String) data.get("sessionIdentity");
        String userName = authentication.getName();
        System.out.println("sessionIdentity : "+sessionIdentity);
        System.out.println("userName : "+userName);
        MessageController.translatorMap.put(userName,sessionIdentity);
        System.out.println("translatorMap : "+MessageController.translatorMap);
    }
}
