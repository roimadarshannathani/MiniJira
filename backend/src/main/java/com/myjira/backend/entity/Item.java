package com.myjira.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Data
public class Item {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String description;
    private String status; // "TODO", "IN_PROGRESS", "DONE"
    private LocalDate dueDate;

    @ManyToOne
    private User user;
}
