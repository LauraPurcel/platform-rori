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
    public void onContractChanged(Contract contract, ContractEventType eventType) {
        ContractLog log = new ContractLog();
        log.setContractId(contract.getId());
        log.setEmployeeId(contract.getEmployee().getId());
        log.setEventType(eventType);
        log.setTimestamp(LocalDateTime.now());

        logRepo.save(log);
    }
}
