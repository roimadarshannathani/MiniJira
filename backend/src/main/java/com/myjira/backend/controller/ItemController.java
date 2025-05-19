package com.myjira.backend.controller;

import com.myjira.backend.entity.Item;
import com.myjira.backend.service.ItemService;
import com.myjira.backend.service.UserService;
import com.myjira.backend.utils.ApiResponse;
import com.myjira.backend.utils.ApiResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("item")
public class ItemController {
    @Autowired
    private UserService userService;

    @Autowired
    private ItemService itemService;

    @GetMapping("/get-all-items")
    @Operation(summary = "Get all items", description = "Returns a list of all items")
    public ResponseEntity<ApiResponse<List<Item>>> getAll() {
        List<Item> itemResponse = itemService.getAllItems();
        return ApiResponseUtil.handleResponse(HttpStatus.OK, itemResponse, "Items fetched successfully");
    }

    @PostMapping("/add-item")
    public ResponseEntity<ApiResponse<Item>> addItem(@RequestBody Item item) {
        itemService.addItem(item);
        return ApiResponseUtil.handleResponse(HttpStatus.OK, "Items added successfully");
    }
}
