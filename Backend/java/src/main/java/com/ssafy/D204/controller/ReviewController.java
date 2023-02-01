package com.ssafy.D204.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    //SecurityContextHolder.getContext().getAuthentication() 랑 Authentication authentication는 같은것
    @PostMapping
    public ResponseEntity<String> writeReview(){
        return ResponseEntity.ok().body("리뷰등록이 완료되었습니다.");
    }
}
