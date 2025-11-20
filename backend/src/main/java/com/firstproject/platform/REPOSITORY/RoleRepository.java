package com.firstproject.platform.REPOSITORY;

import com.firstproject.platform.MODEL.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {}