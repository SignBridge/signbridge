package com.ssafy.D204.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class AppException extends RuntimeException{
    private String message;
    private ErrorCode errorCode;
}
