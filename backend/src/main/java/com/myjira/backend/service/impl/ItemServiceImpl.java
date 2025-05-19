package com.myjira.backend.service.impl;

import com.myjira.backend.entity.Item;
import com.myjira.backend.repository.ItemRepository;
import com.myjira.backend.repository.UserRepository;
import com.myjira.backend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public void addItem(Item item) {
        try{
            itemRepository.save(item);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Item> getAllItems(){
        try{
            return itemRepository.findAll();
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public Item getItemById(long id){
        try{
            return itemRepository.findById(id).orElseThrow();
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public Item updateItem(long id, Item updatedItem){
        try{
            Item existingItem = itemRepository.findById(id).orElseThrow();

            existingItem.setDescription(updatedItem.getDescription());
            existingItem.setTitle(updatedItem.getTitle());
            existingItem.setStatus(updatedItem.getStatus());
            existingItem.setDueDate(updatedItem.getDueDate());
            existingItem.setUser(updatedItem.getUser());

            return itemRepository.save(existingItem);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteItem(long id){
        try{
            itemRepository.deleteById(id);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
