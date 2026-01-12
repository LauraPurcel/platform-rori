package com.firstproject.platform.component;

import com.firstproject.platform.entity.Contract;
import org.springframework.stereotype.Component;

@Component("net")
public class NetSalaryStrategy implements SalaryCalculationStrategy {

    @Override
    public double calculate(Contract contract) {
        double gross = contract.getBaseSalary() * contract.getWorkingHours() / 160;

        double tax = 0.1;
        double social = 0.25;

        return gross * (1 - tax - social);
    }
}
