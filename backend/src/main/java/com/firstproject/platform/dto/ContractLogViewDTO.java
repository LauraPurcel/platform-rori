package com.firstproject.platform.dto;

import com.firstproject.platform.entity.ContractEventType;

import java.time.LocalDateTime;

public class ContractLogViewDTO {
    public Long id;
    public String employeeName;
    public String cnp;
    public ContractEventType eventType;
    public LocalDateTime timestamp;
    public String message;
}
