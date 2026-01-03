package com.firstproject.platform.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class DeskRequest {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Employee employee;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private DeskStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DeskStatus getStatus() {
        return status;
    }

    public void setStatus(DeskStatus status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
