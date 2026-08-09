package com.campuslostfound.campus_lost_found_backend.service;

import com.campuslostfound.campus_lost_found_backend.entity.Conversation;
import com.campuslostfound.campus_lost_found_backend.entity.User;

import java.util.List;

public interface ConversationService {

    Conversation createConversation(
            Long itemId,
            User currentUser,
            Long otherUserId
    );

    List<Conversation> getMyConversations(
            User currentUser
    );

    Conversation getConversationById(
            Long id,
            User currentUser
    );
}