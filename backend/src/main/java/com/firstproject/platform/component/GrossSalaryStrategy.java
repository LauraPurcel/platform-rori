package com.firstproject.platform.component;

import com.firstproject.platform.entity.Contract;
import org.springframework.stereotype.Component;

@Component("gross")
public class GrossSalaryStrategy implements SalaryCalculationStrategy {

    @Override
    public double calculate(Contract contract) {
        return contract.getBaseSalary() * contract.getWorkingHours() * 4 / 160;
    }
}
