package com.firstproject.platform.controller;

import com.firstproject.platform.dto.ContractLogViewDTO;
import com.firstproject.platform.service.ContractLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hr/contract-logs")
public class HRContractLogController {

    @Autowired
    private ContractLogService logService;

    @GetMapping
    public List<ContractLogViewDTO> getLogs() {
        return logService.getAllLogs();
    }
}
