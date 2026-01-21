package com.firstproject.platform.service;

import com.firstproject.platform.dto.ContractLogViewDTO;
import com.firstproject.platform.repository.ContractLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.firstproject.platform.entity.ContractEventType;
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
                    } else {
                        dto.employeeName = "Necunoscut";
                        dto.cnp = "-";
                    }

                    dto.message = log.getMessage();
                    return dto;
                }).toList();
    }
    public List<ContractLogViewDTO> getLogsForEmployee(Long employeeId) {
        return logRepo.findAllByEmployeeIdOrderByTimestampDesc(employeeId)
                .stream()
                .map(log -> {
                    ContractLogViewDTO dto = new ContractLogViewDTO();
                    dto.id = log.getId();
                    dto.eventType = log.getEventType();
                    dto.timestamp = log.getTimestamp();
                    dto.message = log.getMessage();
                    return dto;
                })
                .toList();
    }
}
