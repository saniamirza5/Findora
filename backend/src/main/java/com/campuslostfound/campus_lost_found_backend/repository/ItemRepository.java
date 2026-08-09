package com.campuslostfound.campus_lost_found_backend.repository;

import com.campuslostfound.campus_lost_found_backend.entity.Item;
import com.campuslostfound.campus_lost_found_backend.entity.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByStatus(ItemStatus status);

    List<Item> findByLocationContainingIgnoreCase(String location);

    List<Item> findByItemNameContainingIgnoreCase(String itemName);

    List<Item> findByUserId(Long userId);
}