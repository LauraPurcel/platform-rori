package com.firstproject.platform.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.*;
@Entity
public class Contract {

    @Id
    @GeneratedValue
    private Long id;

    private String jobTitle;
    private double baseSalary;
    private int workingHours;

    private int paidLeaveDaysTotal;
    private int paidLeaveDaysLeft;
    @OneToOne
    @JoinColumn(name = "employee_id", unique = true)
    private Employee employee;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public double getBaseSalary() {
        return baseSalary;
    }

    public void setBaseSalary(double baseSalary) {
        this.baseSalary = baseSalary;
    }

    public int getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(int workingHours) {
        this.workingHours = workingHours;
    }

    public int getPaidLeaveDaysTotal() {
        return paidLeaveDaysTotal;
    }

    public void setPaidLeaveDaysTotal(int paidLeaveDaysTotal) {
        this.paidLeaveDaysTotal = paidLeaveDaysTotal;
    }

    public int getPaidLeaveDaysLeft() {
        return paidLeaveDaysLeft;
    }

    public void setPaidLeaveDaysLeft(int paidLeaveDaysLeft) {
        this.paidLeaveDaysLeft = paidLeaveDaysLeft;
    }
}
