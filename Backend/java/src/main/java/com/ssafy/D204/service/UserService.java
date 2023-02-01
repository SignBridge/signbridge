package com.ssafy.D204.service;

import com.ssafy.D204.domain.User;
import com.ssafy.D204.domain.dto.UserSerializer;
import com.ssafy.D204.exception.AppException;
import com.ssafy.D204.exception.ErrorCode;
import com.ssafy.D204.repository.UserRepository;
import com.ssafy.D204.utiles.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder;

    @Value("${jwt.secret}")
    private String secretKey;
    private Long expiredMs = 1000*60*60L; //만료기한같다

    public String join(String userName, String password, String name, String email, Boolean isActive, String role){

        //userName 중복check
        userRepository.findByUserName(userName)
                .ifPresent(user -> {
                    throw new AppException(userName + "는 이미 있습니다", ErrorCode.USERNAME_DUPLICATED);
                });


        // 저장
        User user = User.builder()
                .userName(userName)
                .password(encoder.encode(password))
                .name(name)
                .email(email)
                .isActive(isActive)
                .role(role)
                .build();
        userRepository.save(user);

        return "SECCESS";
    }


    public Map<String, Object> login(String userName, String password){
        //userName없음
        User selectedUser = userRepository.findByUserName(userName)
                .orElseThrow(()->new AppException(userName + "이 없습니다.", ErrorCode.USERNAME_NOT_FOUND));

        //password틀림
        if(!encoder.matches(password,selectedUser.getPassword())){
            throw new AppException("패스워드를 잘못 입력했습니다.", ErrorCode.INVALID_PASSWORD);
        }

        //JWT만들기
        Long userId = selectedUser.getId();
        String name = selectedUser.getName();
        String email = selectedUser.getEmail();
        Boolean is_active = selectedUser.getIsActive();
        String role = selectedUser.getRole();
        String token = JwtUtil.createJwt(userId,userName,name,email,is_active,role,secretKey,expiredMs);

        //response에 유저정보담기 / 토큰에도 담겨있음
        Map<String,Object> response = new HashMap<>();
        response.put("id",selectedUser.getId());
        response.put("token",token);
        response.put("userName",selectedUser.getUserName());
        response.put("name",selectedUser.getName());
        response.put("email",selectedUser.getEmail());
        response.put("is_active",selectedUser.getIsActive());
        response.put("role",selectedUser.getRole());

        return response;
    }


    public UserSerializer getUserInfo(String userName){
        User selectedUser = userRepository.findByUserName(userName)
                .orElseThrow(()->new AppException(userName + "이 없습니다.", ErrorCode.USERNAME_NOT_FOUND));


        UserSerializer responseUser = new UserSerializer();
        responseUser.setUserName(selectedUser.getUserName());
        responseUser.setName(selectedUser.getName());
        responseUser.setEmail(selectedUser.getEmail());
        responseUser.setIsActive(selectedUser.getIsActive());
        responseUser.setRole(selectedUser.getRole());
        return responseUser;
    }

    public User findByUserId(Long userId){
        return userRepository.findById(userId).orElse(null);
    }


    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public String deleteUser(String userName) {
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()) {
            userRepository.delete(user.get()); //optional에서 .get을 하면 엔티티가 나온다
            return user.get().getUserName();
        } else {
            throw new AppException(userName + "이 없습니다.", ErrorCode.USERNAME_NOT_FOUND);
        }
    }
}
