package com.ssafy.D204.utiles;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {
    public static String getUserName(String token,String secretKey){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().get("userName",String.class);
    }

    public static String getUserRole(String token,String secretKey){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().get("role",String.class);
    }



    public static boolean isExpired(String token,String secretKey){
        //만료시각이 지금보다 이전/이후 ->  ture/false반환
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }

    //token만들기
    //claims에 원하는 정보를 담아 토큰에 담아 전달할 수 있음
    //token에 담을 정보 : userId, userName,
    public static String createJwt(Long userId,String userName,String name,String email,Boolean is_active, String role,
                                   String secretKey,long expireTimeMs){
        Claims claims = Jwts.claims(); //일종의 map
        claims.put("userId",userId);
        claims.put("userName",userName);
        claims.put("name",name);
        claims.put("email",email);
        claims.put("is_active",is_active);
        claims.put("role",role);


        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis())) //오늘날짜
                .setExpiration(new Date(System.currentTimeMillis()+expireTimeMs))
                .signWith(SignatureAlgorithm.HS256,secretKey)
                .compact();
    }
}
