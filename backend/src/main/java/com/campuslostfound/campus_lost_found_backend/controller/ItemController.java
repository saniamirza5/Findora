package com.campuslostfound.campus_lost_found_backend.controller;

import com.campuslostfound.campus_lost_found_backend.entity.Item;
import com.campuslostfound.campus_lost_found_backend.entity.User;
import com.campuslostfound.campus_lost_found_backend.service.CloudinaryService;
import com.campuslostfound.campus_lost_found_backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;
    private final CloudinaryService cloudinaryService;

    // Create item with image
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Item> createItem(
            @RequestParam("itemName") String itemName,
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("dateReported") String dateReported,
            @RequestParam("status") String status,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication authentication
    ) throws IOException {

        User user = (User) authentication.getPrincipal();

        Item item = new Item();

        item.setItemName(itemName);
        item.setDescription(description);
        item.setLocation(location);
        item.setDateReported(
                java.time.LocalDate.parse(dateReported)
        );
        item.setStatus(
                com.campuslostfound.campus_lost_found_backend.entity.ItemStatus
                        .valueOf(status)
        );

        if (image != null && !image.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(image);
            item.setImageUrl(imageUrl);
        }

        return ResponseEntity.ok(
                itemService.createItem(item, user)
        );
    }

    // Get all items
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(
                itemService.getAllItems()
        );
    }

    // Get item by ID
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                itemService.getItemById(id)
        );
    }

    // Get items uploaded by a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Item>> getItemsByUser(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(
                itemService.getItemsByUser(userId)
        );
    }

    // Search by item name
    @GetMapping("/search/name")
    public ResponseEntity<List<Item>> searchByName(
            @RequestParam String name
    ) {
        return ResponseEntity.ok(
                itemService.searchByName(name)
        );
    }

    // Search by location
    @GetMapping("/search/location")
    public ResponseEntity<List<Item>> searchByLocation(
            @RequestParam String location
    ) {
        return ResponseEntity.ok(
                itemService.searchByLocation(location)
        );
    }

    // Update item
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(
            @PathVariable Long id,
            @RequestBody Item item,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                itemService.updateItem(id, item, user)
        );
    }

    // Delete item
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(
            @PathVariable Long id,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();

        itemService.deleteItem(id, user);

        return ResponseEntity.ok("Item deleted successfully");
    }
}