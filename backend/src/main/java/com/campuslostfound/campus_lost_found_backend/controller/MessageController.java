package com.campuslostfound.campus_lost_found_backend.controller;

import com.campuslostfound.campus_lost_found_backend.entity.Message;
import com.campuslostfound.campus_lost_found_backend.entity.User;
import com.campuslostfound.campus_lost_found_backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<Message> sendMessage(
            @RequestParam Long conversationId,
            @RequestParam String content,
            Authentication authentication
    ) {

        User sender = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                messageService.sendMessage(
                        conversationId,
                        content,
                        sender
                )
        );
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable Long conversationId,
            Authentication authentication
    ) {

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                messageService.getMessages(
                        conversationId,
                        currentUser
                )
        );
    }
}