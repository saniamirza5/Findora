package com.campuslostfound.campus_lost_found_backend.controller;

import com.campuslostfound.campus_lost_found_backend.entity.Conversation;
import com.campuslostfound.campus_lost_found_backend.entity.User;
import com.campuslostfound.campus_lost_found_backend.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;

    @PostMapping
    public ResponseEntity<Conversation> createConversation(
            @RequestParam Long itemId,
            @RequestParam Long otherUserId,
            Authentication authentication
    ) {

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                conversationService.createConversation(
                        itemId,
                        currentUser,
                        otherUserId
                )
        );
    }

    @GetMapping
    public ResponseEntity<List<Conversation>> getMyConversations(
            Authentication authentication
    ) {

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                conversationService.getMyConversations(currentUser)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conversation> getConversationById(
            @PathVariable Long id,
            Authentication authentication
    ) {

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                conversationService.getConversationById(
                        id,
                        currentUser
                )
        );
    }
}