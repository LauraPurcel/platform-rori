package com.firstproject.platform.service;

import com.firstproject.platform.component.SalaryCalculationStrategy;
import com.firstproject.platform.entity.Contract;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class SalaryService {

    private final Map<String, SalaryCalculationStrategy> strategies;

    public double calculateSalary(Contract contract, String type) {
        SalaryCalculationStrategy strategy = strategies.get(type);
        if (strategy == null) throw new RuntimeException("Strategie necunoscută: " + type);
        return strategy.calculate(contract);
    }
}
