package com.firstproject.platform.service;

import com.firstproject.platform.dto.ContractLogViewDTO;
import com.firstproject.platform.repository.ContractLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractLogService {

    @Autowired
    private ContractLogRepository logRepo;

    public List<ContractLogViewDTO> getAllLogs() {
        return logRepo.findAllByOrderByTimestampDesc()
                .stream()
                .map(log -> {
                    ContractLogViewDTO dto = new ContractLogViewDTO();
                    dto.id = log.getId();
                    dto.eventType = log.getEventType();
                    dto.timestamp = log.getTimestamp();

                    if (log.getEmployeeId() != null) {
                        dto.employeeName = "Employee ID: " + log.getEmployeeId();
                        dto.cnp = "-";
                    }

                    return dto;
                }).toList();
    }
}
