package com.example.compliance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.compliance.model.Compliance;
import java.util.Optional;

public interface ComplianceRepo extends JpaRepository<Compliance, Long> {
    Optional<Compliance> findByEnv(String env);
}
