package com.firstproject.platform.service;

import com.firstproject.platform.entity.DeskRequest;
import com.firstproject.platform.entity.DeskStatus;
import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.repository.DeskRequestRepository;
import com.firstproject.platform.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class DeskService {
    @Autowired private DeskRequestRepository deskRepo;
    @Autowired private EmployeeRepository empRepo;

    public void reserve(LocalDate date, String email) {
        // 1. Verificăm câte rezervări sunt deja pentru acea zi
        long count = deskRepo.countByDate(date);

        if (count >= 20) {
            throw new RuntimeException("Nu mai sunt locuri disponibile pentru această zi!");
        }

        // 2. Verificăm dacă angajatul are deja rezervare în acea zi
        Employee emp = empRepo.findByUserEmail(email).orElseThrow();
        if (deskRepo.existsByEmployeeAndDate(emp, date)) {
            throw new RuntimeException("Ai rezervat deja un loc pentru această zi!");
        }

        DeskRequest res = new DeskRequest();
        res.setEmployee(emp);
        res.setDate(date);
        res.setStatus(DeskStatus.APPROVED); // Se aprobă automat dacă sunt locuri
        deskRepo.save(res);
    }
}