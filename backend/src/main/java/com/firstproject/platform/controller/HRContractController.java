package com.firstproject.platform.controller;

import com.firstproject.platform.dto.ContractViewDTO;
import com.firstproject.platform.dto.CreateContractDTO;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hr/contracts")
public class HRContractController {

    @Autowired
    private ContractService contractService;

    @GetMapping("/uncontracted")
    public List<Employee> uncontractedEmployees() {
        return contractService.getUncontractedEmployees();
    }

    @PostMapping
    public void create(@RequestBody CreateContractDTO dto) {
        contractService.createContract(dto);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody CreateContractDTO dto) {
        contractService.updateContract(id, dto);
    }
    @GetMapping("/all")
    public List<ContractViewDTO> getAllContracts() {
        return contractService.getAllContracts();
    }
}
