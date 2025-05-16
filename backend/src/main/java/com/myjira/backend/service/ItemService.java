package com.myjira.backend.service;

import com.myjira.backend.entity.Item;

import java.util.List;

public interface ItemService {
    List<Item> getAllItems();
    Item getItemById(long id);
    void addItem(Item item);
    Item updateItem(long id, Item item);
    void deleteItem(long id);
}
