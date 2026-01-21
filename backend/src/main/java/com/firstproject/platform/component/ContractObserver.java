package com.firstproject.platform.component;

import com.firstproject.platform.entity.Contract;
import com.firstproject.platform.entity.ContractEventType;

public interface ContractObserver {
    void onContractChanged(Contract oldContract, Contract newContract, ContractEventType eventType);
}
