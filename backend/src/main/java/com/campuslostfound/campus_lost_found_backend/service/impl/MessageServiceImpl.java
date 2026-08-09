package com.campuslostfound.campus_lost_found_backend.service.impl;

import com.campuslostfound.campus_lost_found_backend.entity.Conversation;
import com.campuslostfound.campus_lost_found_backend.entity.Message;
import com.campuslostfound.campus_lost_found_backend.entity.User;
import com.campuslostfound.campus_lost_found_backend.repository.ConversationRepository;
import com.campuslostfound.campus_lost_found_backend.repository.MessageRepository;
import com.campuslostfound.campus_lost_found_backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;

    @Override
    public Message sendMessage(
            Long conversationId,
            String content,
            User sender
    ) {

        Conversation conversation = conversationRepository
                .findById(conversationId)
                .orElseThrow(() ->
                        new RuntimeException("Conversation not found")
                );

        boolean isParticipant =
                conversation.getUser1().getId().equals(sender.getId())
                        ||
                        conversation.getUser2().getId().equals(sender.getId());

        if (!isParticipant) {
            throw new RuntimeException(
                    "You are not a participant in this conversation"
            );
        }

        if (content == null || content.trim().isEmpty()) {
            throw new RuntimeException(
                    "Message cannot be empty"
            );
        }

        Message message = Message.builder()
                .conversation(conversation)
                .sender(sender)
                .content(content.trim())
                .createdAt(LocalDateTime.now())
                .build();

        return messageRepository.save(message);
    }

    @Override
    public List<Message> getMessages(
            Long conversationId,
            User currentUser
    ) {

        Conversation conversation = conversationRepository
                .findById(conversationId)
                .orElseThrow(() ->
                        new RuntimeException("Conversation not found")
                );

        boolean isParticipant =
                conversation.getUser1().getId().equals(currentUser.getId())
                        ||
                        conversation.getUser2().getId().equals(currentUser.getId());

        if (!isParticipant) {
            throw new RuntimeException(
                    "You are not a participant in this conversation"
            );
        }

        return messageRepository
                .findByConversationIdOrderByCreatedAtAsc(
                        conversationId
                );
    }
}