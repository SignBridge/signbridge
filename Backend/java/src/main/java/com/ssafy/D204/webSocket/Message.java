package com.ssafy.D204.webSocket;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Message {

    private String from;
    private String text;

    private String username;

    public String getText() {
        return text;
    }

    public String getTo() {
        return username;
    }

    public void setTo(String to) {
        this.username = username;
    }
}