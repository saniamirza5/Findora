package com.campuslostfound.campus_lost_found_backend.controller;

import com.campuslostfound.campus_lost_found_backend.dto.ChatMessage;
import com.campuslostfound.campus_lost_found_backend.entity.Message;
import com.campuslostfound.campus_lost_found_backend.entity.User;
import com.campuslostfound.campus_lost_found_backend.service.MessageService;
import com.campuslostfound.campus_lost_found_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MessageService messageService;
    private final UserService userService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void sendMessage(ChatMessage chatMessage) {

        User sender = userService.getUserById(
                chatMessage.getSenderId()
        );

        Message savedMessage = messageService.sendMessage(
                chatMessage.getConversationId(),
                chatMessage.getContent(),
                sender
        );

        ChatMessage response = new ChatMessage(
                savedMessage.getConversation().getId(),
                savedMessage.getSender().getId(),
                savedMessage.getContent()
        );

        messagingTemplate.convertAndSend(
                "/topic/conversation/"
                        + savedMessage.getConversation().getId(),
                response
        );
    }
}