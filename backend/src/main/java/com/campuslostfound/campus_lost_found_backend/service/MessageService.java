package com.campuslostfound.campus_lost_found_backend.service;

import com.campuslostfound.campus_lost_found_backend.entity.Message;
import com.campuslostfound.campus_lost_found_backend.entity.User;

import java.util.List;

public interface MessageService {

    Message sendMessage(
            Long conversationId,
            String content,
            User sender
    );

    List<Message> getMessages(
            Long conversationId,
            User currentUser
    );
}