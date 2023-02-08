package com.ssafy.D204.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String password;
    private String name;
    private String email;
    private Boolean isActive;
    private String role;

}

