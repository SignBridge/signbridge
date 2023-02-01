package com.ssafy.D204.controller;


import com.ssafy.D204.domain.User;
import com.ssafy.D204.domain.dto.UserSerializer;
import com.ssafy.D204.domain.dto.UserJoinRequest;
import com.ssafy.D204.domain.dto.UserLoginRequest;
import com.ssafy.D204.domain.dto.UserUpdateRequest;
import com.ssafy.D204.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {



    @Value("${jwt.secret}")
    private String secretKey;
    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody UserJoinRequest dto){
        userService.join(dto.getUserName(),dto.getPassword(),dto.getName(),dto.getEmail(),dto.getIsActive(),dto.getRole());
        return ResponseEntity.ok().body("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody UserLoginRequest dto) {
        System.out.println("In login"+ SecurityContextHolder.getContext());
        Map<String,Object> response;
        response = userService.login(dto.getUserName(), dto.getPassword());

        return ResponseEntity.ok(response);
    }


    //유저정보 CRUD
    @GetMapping("/me")
    public ResponseEntity<UserSerializer> getUserInfo (Authentication authentication){

        String userName = authentication.getName();
        UserSerializer responseUser = userService.getUserInfo(userName);

        return ResponseEntity.ok()
                .body(responseUser);
    }

    //토큰에 들어있는 정보로 DB에 해당 user데이터를 가져온 후에 update한다
    @PutMapping("/update")
    public ResponseEntity<UserSerializer> updateUser(@RequestHeader("Authorization") String authorizationHeader,
                                           @RequestBody UserUpdateRequest userUpdateRequest){
        String token = authorizationHeader.substring(7);

        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        Long userId = claims.get("userId", Long.class);

        User user = userService.findByUserId(userId);

        user.setName(userUpdateRequest.getName());
        user.setEmail(userUpdateRequest.getEmail());
        user.setIsActive(userUpdateRequest.getIsActive());

        User updatedUser = userService.updateUser(user);

        UserSerializer userSerializer = new UserSerializer();
        userSerializer.setUserName(user.getUserName());
        userSerializer.setName(user.getName());
        userSerializer.setEmail(user.getEmail());
        userSerializer.setIsActive(user.getIsActive());

        return ResponseEntity.ok().body(userSerializer);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, String >> deleteUser (Authentication authentication){

        String userName = authentication.getName();
        String  deletedUserName = userService.deleteUser(userName);

        Map<String, String > response = new HashMap<>();
        response.put("message",deletedUserName+"이 삭제되었습니다");
        return ResponseEntity.ok()
                .body(response);
    }



}
