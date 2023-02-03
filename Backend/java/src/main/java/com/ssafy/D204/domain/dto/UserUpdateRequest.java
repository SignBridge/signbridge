package com.ssafy.D204.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class UserUpdateRequest {

    private String name;
    private String email;
    private Boolean isActive;
}
