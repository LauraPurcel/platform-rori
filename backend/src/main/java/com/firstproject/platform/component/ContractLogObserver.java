package com.firstproject.platform.component;

import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.ContractEventType;
import com.firstproject.platform.entity.ContractLog;
import com.firstproject.platform.repository.ContractLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
@Component
public class ContractLogObserver implements ContractObserver {

    @Autowired
    private ContractLogRepository logRepo;

    @Override
    public void onContractChanged(Contract oldContract,
                                  Contract newContract,
                                  ContractEventType eventType) {

        ContractLog log = new ContractLog();
        log.setEventType(eventType);
        log.setTimestamp(LocalDateTime.now());

        Contract referenceContract = (newContract != null) ? newContract : oldContract;

        if (referenceContract != null) {
            log.setContractId(referenceContract.getId());
            if (referenceContract.getEmployee() != null) {
                log.setEmployeeId(referenceContract.getEmployee().getId());
            }
        }

        log.setMessage(buildMessage(oldContract, newContract, eventType));

        logRepo.save(log);
    }

    private String buildMessage(Contract oldC, Contract newC, ContractEventType type) {
        return switch (type) {
            case CREATE ->
                    "Contract creat cu salariu " + newC.getBaseSalary() +
                            " și " + newC.getWorkingHours() + " ore";

            case UPDATE ->
                    "Contract modificat: salariu " +
                            oldC.getBaseSalary() + " → " + newC.getBaseSalary() +
                            ", ore " +
                            oldC.getWorkingHours() + " → " + newC.getWorkingHours();

            case DELETE ->
                    "Contract șters (ID: " + oldC.getId() + ", Salariu: " + oldC.getBaseSalary() +
                            ", Ore: " + oldC.getWorkingHours() + ")";
        };
    }
}
