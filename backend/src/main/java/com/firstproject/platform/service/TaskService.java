package com.firstproject.platform.service;

import com.firstproject.platform.entity.Employee;
import com.firstproject.platform.entity.Task;
import com.firstproject.platform.entity.TaskCreateRequest;
import com.firstproject.platform.entity.TaskStatus;
import com.firstproject.platform.repository.EmployeeRepository;
import com.firstproject.platform.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final EmployeeRepository employeeRepository;

    public TaskService(TaskRepository taskRepository,
                       EmployeeRepository employeeRepository) {
        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
    }

    public Task createTask(TaskCreateRequest request) {

        Employee employee = employeeRepository.findById(request.employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Task task = new Task();
        task.setTitle(request.title);
        task.setDescription(request.description);
        task.setEstimatedHours(request.estimatedHours);
        task.setAssignedTo(employee);
        task.setStatus(TaskStatus.TODO);

        return taskRepository.save(task);
    }

    public List<Task> getTasksForEmployee(Employee employee) {
        return taskRepository.findByAssignedTo(employee);
    }
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }


    public Task updateTaskStatus(Long taskId, TaskStatus newStatus, Employee employee) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));


        if (!task.getAssignedTo().getId().equals(employee.getId())) {
            throw new RuntimeException("Nu ai dreptul să modifici acest task");
        }

        task.setStatus(newStatus);
        return taskRepository.save(task);
    }
}
