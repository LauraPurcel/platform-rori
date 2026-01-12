package com.firstproject.platform.component;

import com.firstproject.platform.entity.Contract;

public interface SalaryCalculationStrategy {
    double calculate(Contract contract);
}
