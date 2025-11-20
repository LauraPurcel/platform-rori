package com.firstproject.platform.REPOSITORY;

import com.firstproject.platform.MODEL.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {}
