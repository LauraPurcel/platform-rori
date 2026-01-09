package com.firstproject.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HrStatsDTO {
    private long totalEmployees;
    private long activeContracts;
    private long uncontracted;
    private long pendingLeaves;
}
