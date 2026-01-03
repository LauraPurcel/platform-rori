package com.firstproject.platform.repository;

import com.firstproject.platform.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {}
