package com.firstproject.platform.service;
import com.firstproject.platform.component.ContractObserver;
import com.firstproject.platform.dto.ContractViewDTO;
import com.firstproject.platform.dto.CreateContractDTO;
import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.ContractEventType;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.repository.ContractRepository;
import com.firstproject.platform.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

    @Autowired private EmployeeRepository empRepo;
    @Autowired private ContractRepository contractRepo;
    @Autowired private List<ContractObserver> observers;

    public void createContract(CreateContractDTO dto) {
        Employee e = empRepo.findByCnp(dto.cnp).orElseThrow();

        Contract c = new Contract();
        c.setEmployee(e);
        c.setJobTitle(dto.jobTitle);
        c.setBaseSalary(dto.baseSalary);
        c.setWorkingHours(dto.workingHours);
        c.setPaidLeaveDaysTotal(21);
        c.setPaidLeaveDaysLeft(21);

        contractRepo.save(c);

        notifyObservers(c, ContractEventType.CREATE);
    }
    public List<Employee> getUncontractedEmployees() {
        return empRepo.findEmployeesWithoutContract();
    }

    public void updateContract(Long id, CreateContractDTO dto) {
        Contract c = contractRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contractul nu există"));

        updateContractFields(c, dto);
        contractRepo.save(c);

        notifyObservers(c, ContractEventType.UPDATE);
    }

    public void deleteContract(Long id) {
        Contract c = contractRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contractul nu există"));
        notifyObservers(c, ContractEventType.DELETE);
        contractRepo.deleteById(id);
    }


    private void updateContractFields(Contract c, CreateContractDTO dto) {
        c.setJobTitle(dto.jobTitle);
        c.setBaseSalary(dto.baseSalary);
        c.setWorkingHours(dto.workingHours);
    }
    public List<ContractViewDTO> getAllContracts() {
        return contractRepo.findAll().stream().map(c -> {
            ContractViewDTO dto = new ContractViewDTO();
            dto.contractId = c.getId();
            dto.cnp = c.getEmployee().getCnp();
            dto.firstName = c.getEmployee().getFirstName();
            dto.lastName = c.getEmployee().getLastName();
            dto.jobTitle = c.getJobTitle();
            dto.baseSalary = c.getBaseSalary();
            dto.workingHours = c.getWorkingHours();
            return dto;
        }).toList();
    }

    private void notifyObservers(Contract contract, ContractEventType type) {
        observers.forEach(o -> o.onContractChanged(contract, type));
    }


}