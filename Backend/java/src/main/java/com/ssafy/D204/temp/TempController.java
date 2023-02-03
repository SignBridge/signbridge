package com.ssafy.D204.temp;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TempController {
    @GetMapping("/temp/login")
    public String LoginForm(){
        return "login";
    }

}
