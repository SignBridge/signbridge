package com.ssafy.D204.repository;

import com.ssafy.D204.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User,Long> {
    Optional<User> findByUserName(String userName);

}
