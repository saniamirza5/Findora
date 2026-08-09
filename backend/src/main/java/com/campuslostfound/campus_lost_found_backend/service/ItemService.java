package com.campuslostfound.campus_lost_found_backend.service;

import com.campuslostfound.campus_lost_found_backend.entity.Item;
import com.campuslostfound.campus_lost_found_backend.entity.User;

import java.util.List;

public interface ItemService {

    Item createItem(Item item, User user);

    List<Item> getAllItems();

    Item getItemById(Long id);

    List<Item> getItemsByUser(Long userId);

    List<Item> searchByName(String itemName);

    List<Item> searchByLocation(String location);

    Item updateItem(Long id, Item item, User user);

    void deleteItem(Long id, User user);
}