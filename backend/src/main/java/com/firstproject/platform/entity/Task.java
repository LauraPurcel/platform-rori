package com.firstproject.platform.entity;
import jakarta.persistence.*;
@Entity
public class Task {

    @Id @GeneratedValue
    private Long id;

    private String title;
    private String description;

    @ManyToOne
    private Employee assignedTo;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    private int estimatedHours;
}

