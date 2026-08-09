package com.campuslostfound.campus_lost_found_backend.service.impl;

import com.campuslostfound.campus_lost_found_backend.entity.Item;
import com.campuslostfound.campus_lost_found_backend.entity.User;
import com.campuslostfound.campus_lost_found_backend.repository.ItemRepository;
import com.campuslostfound.campus_lost_found_backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    @Override
    public Item createItem(Item item, User user) {

        item.setUser(user);
        item.setCreatedAt(LocalDateTime.now());

        return itemRepository.save(item);
    }

    @Override
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item getItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    @Override
    public List<Item> getItemsByUser(Long userId) {
        return itemRepository.findByUserId(userId);
    }

    @Override
    public List<Item> searchByName(String itemName) {
        return itemRepository.findByItemNameContainingIgnoreCase(itemName);
    }

    @Override
    public List<Item> searchByLocation(String location) {
        return itemRepository.findByLocationContainingIgnoreCase(location);
    }

    @Override
    public Item updateItem(Long id, Item updatedItem, User user) {

        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!existingItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to update this item");
        }

        existingItem.setItemName(updatedItem.getItemName());
        existingItem.setDescription(updatedItem.getDescription());
        existingItem.setImageUrl(updatedItem.getImageUrl());
        existingItem.setLocation(updatedItem.getLocation());
        existingItem.setDateReported(updatedItem.getDateReported());
        existingItem.setStatus(updatedItem.getStatus());

        return itemRepository.save(existingItem);
    }

    @Override
    public void deleteItem(Long id, User user) {

        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!existingItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to delete this item");
        }

        itemRepository.delete(existingItem);
    }
}