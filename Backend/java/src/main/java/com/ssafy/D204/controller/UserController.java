package com.ssafy.D204.controller;


import com.ssafy.D204.domain.User;
import com.ssafy.D204.domain.dto.UserSerializer;
import com.ssafy.D204.domain.dto.UserJoinRequest;
import com.ssafy.D204.domain.dto.UserLoginRequest;
import com.ssafy.D204.domain.dto.UserUpdateRequest;
import com.ssafy.D204.service.UserService;
import com.ssafy.D204.webSocket.MessageController;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.swagger.annotations.ApiOperation;
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

    @ApiOperation(value = "회원가입", notes = "role은 ADMIN, TRANSLATOR 둘중 하나로 전달, 오타주의")
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody UserJoinRequest dto){
        userService.join(dto.getUserName(),dto.getPassword(),dto.getName(),dto.getEmail(),dto.getIsActive(),dto.getRole());
        return ResponseEntity.ok().body("회원가입 성공");
    }

    @ApiOperation(value = "로그인", notes = "userId와 password만 입력")
    @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> login(@RequestBody UserLoginRequest dto) {
        System.out.println(dto.getUserName());
        System.out.println(dto.getPassword());
        System.out.println("In login"+ SecurityContextHolder.getContext());
        Map<String,Object> response;
        response = userService.login(dto.getUserName(), dto.getPassword());


        return ResponseEntity.ok(response);
    }

    //유저정보 CRUD
    @ApiOperation(value = "내정보보기", notes = "토큰을 'Bearer Token' 형식으로 header의 Authorization에 넣어 전달한다, 유저정보반환")
    @GetMapping("/me")
    public ResponseEntity<UserSerializer> getUserInfo (Authentication authentication){

        String userName = authentication.getName();
        UserSerializer responseUser = userService.getUserInfo(userName);
        System.out.println(authentication.getName());
        return ResponseEntity.ok()
                .body(responseUser);
    }

    //토큰에 들어있는 정보로 DB에 해당 user데이터를 가져온 후에 update한다
    @ApiOperation(value = "내정보수정", notes = "토큰을 'Bearer Token' 형식으로 header의 Authorization에 넣어 전달한다, " +
            "body에 Json으로 name,email,isActive값을 넣어 전달한다, 이후 업데이트된 유저정보 반환")
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
        String deletedUserName = userService.deleteUser(userName);

        Map<String, String > response = new HashMap<>();
        response.put("message",deletedUserName+"이 삭제되었습니다");
        return ResponseEntity.ok()
                .body(response);
    }

    @ApiOperation(value = "로그아웃", notes = "header에 token값만을 넣어 전달, 소켓통신 로그인 유저 Mapping에서 해당로그인 유저 remove")
    @PostMapping("/logout")
    public void logout(Authentication authentication){
        String userName = authentication.getName();
        userService.logout(userName);

    }

    @PostMapping("/active-toggle")
    public boolean activeToggle(Authentication authentication){
        String userName = authentication.getName();
        boolean toggle = userService.activeToggle(userName);
        return toggle;
    }
}
