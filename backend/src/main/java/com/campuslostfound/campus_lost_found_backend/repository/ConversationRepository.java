package com.campuslostfound.campus_lost_found_backend.repository;

import com.campuslostfound.campus_lost_found_backend.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    List<Conversation> findByUser1IdOrUser2Id(Long user1Id, Long user2Id);

    Optional<Conversation> findByItemIdAndUser1IdAndUser2Id(
            Long itemId,
            Long user1Id,
            Long user2Id
    );
}