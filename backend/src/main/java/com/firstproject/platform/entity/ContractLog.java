package com.firstproject.platform.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ContractLog {

    @Id
    @GeneratedValue
    private Long id;

    private Long contractId;
    private Long employeeId;

    @Enumerated(EnumType.STRING)
    private ContractEventType eventType;

    private LocalDateTime timestamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getContractId() {
        return contractId;
    }

    public void setContractId(Long contractId) {
        this.contractId = contractId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public ContractEventType getEventType() {
        return eventType;
    }

    public void setEventType(ContractEventType eventType) {
        this.eventType = eventType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
