package com.campuslostfound.campus_lost_found_backend.service.impl;

import com.campuslostfound.campus_lost_found_backend.entity.Conversation;
import com.campuslostfound.campus_lost_found_backend.entity.Item;
import com.campuslostfound.campus_lost_found_backend.entity.User;
import com.campuslostfound.campus_lost_found_backend.repository.ConversationRepository;
import com.campuslostfound.campus_lost_found_backend.repository.ItemRepository;
import com.campuslostfound.campus_lost_found_backend.repository.UserRepository;
import com.campuslostfound.campus_lost_found_backend.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository conversationRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    @Override
    public Conversation createConversation(
            Long itemId,
            User currentUser,
            Long otherUserId
    ) {

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        User otherUser = userRepository.findById(otherUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (currentUser.getId().equals(otherUser.getId())) {
            throw new RuntimeException("You cannot start a conversation with yourself");
        }

        if (item.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You cannot contact yourself about your own item");
        }

        return conversationRepository
                .findByItemIdAndUser1IdAndUser2Id(
                        itemId,
                        currentUser.getId(),
                        otherUserId
                )
                .orElseGet(() -> {

                    Conversation conversation = Conversation.builder()
                            .item(item)
                            .user1(currentUser)
                            .user2(otherUser)
                            .createdAt(LocalDateTime.now())
                            .build();

                    return conversationRepository.save(conversation);
                });
    }

    @Override
    public List<Conversation> getMyConversations(
            User currentUser
    ) {

        return conversationRepository
                .findByUser1IdOrUser2Id(
                        currentUser.getId(),
                        currentUser.getId()
                );
    }

    @Override
    public Conversation getConversationById(
            Long id,
            User currentUser
    ) {

        Conversation conversation = conversationRepository.findById(id)
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

        return conversation;
    }
}