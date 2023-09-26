package com.example.compliance.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.compliance.model.Compliance;
import com.example.compliance.repository.ComplianceRepo;

@RestController
@RequestMapping("/api/v1")
public class ComplianceRestController {
    @Autowired
    ComplianceRepo complianceRepo;

    @GetMapping("/health")
    public String getHealth() {
        return "Running";
    }

    @GetMapping("/compliance")
    public ResponseEntity<List<Compliance>> getAllCompliances() {
        // Compliance complianceData = new Compliance();
        // complianceData.setEnv("PROD");
        // complianceData.setStatus("PASS");
        // complianceData.setTotal(50);
        // complianceData.setTotalPassed(50);
        // complianceData.setFailed(0);
        // complianceData.setProjectName("External Gateway");
        // complianceData.setReport(null);
        // complianceRepo.save(complianceData);
        List<Compliance> compliance = new ArrayList<Compliance>();
        complianceRepo.findAll().forEach(compliance::add);
        return new ResponseEntity<List<Compliance>>(compliance, HttpStatus.OK);
    }

    @GetMapping("/compliance/{id}")
    public ResponseEntity<Compliance> getComplianceById(@PathVariable("id") long id) {

        Optional<Compliance> compliance = complianceRepo.findById(id);
        if (compliance.isPresent()) {
            return new ResponseEntity<>(compliance.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
