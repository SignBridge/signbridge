package com.ssafy.D204.service;

import com.ssafy.D204.entity.Board;
import com.ssafy.D204.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    @Autowired
    public BoardRepository boardRepository;
    public void write(Board board){
        boardRepository.save(board);
    }
}
