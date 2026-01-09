package com.firstproject.platform.controller;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Task;
import com.firstproject.platform.entity.TaskCreateRequest;
import com.firstproject.platform.entity.TaskStatusUpdateRequest;
import com.firstproject.platform.service.AuthService;
import com.firstproject.platform.service.TaskService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final AuthService authService;

    public TaskController(TaskService taskService,
                          AuthService authService) {
        this.taskService = taskService;
        this.authService = authService;
    }

    @PreAuthorize("hasRole('MANAGER')")
    @PostMapping
    public Task createTask(@RequestBody TaskCreateRequest request) {
        return taskService.createTask(request);
    }

    @PreAuthorize("hasRole('MANAGER')")
    @GetMapping
    public List<Task> allTasks() {
        return taskService.getAllTasks();
    }


    @PreAuthorize("hasRole('EMPLOYEE')")
    @GetMapping("/my")
    public List<Task> myTasks() {
        Employee employee = authService.getCurrentEmployee();
        return taskService.getTasksForEmployee(employee);
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    @PutMapping("/{id}/status")
    public Task updateStatus(@PathVariable Long id,
                             @RequestBody TaskStatusUpdateRequest request) {
        Employee employee = authService.getCurrentEmployee();
        return taskService.updateTaskStatus(id, request.status, employee);
    }
}
