package com.example.compliance.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.compliance.model.Compliance;
import com.example.compliance.repository.ComplianceRepo;

@RestController
@RequestMapping("/api/v1/compliances")
public class ComplianceRestController {
    @Autowired
    ComplianceRepo complianceRepo;

    @GetMapping("/health")
    public String getHealth() {
        return "Running";
    }

    @GetMapping()
    public ResponseEntity<List<Compliance>> getAllCompliances() {
        List<Compliance> compliance = new ArrayList<Compliance>();
        complianceRepo.findAll().forEach(compliance::add);
        return new ResponseEntity<List<Compliance>>(compliance, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Compliance> getComplianceById(@PathVariable("id") long id) {

        Optional<Compliance> compliance = complianceRepo.findById(id);
        if (compliance.isPresent()) {
            return new ResponseEntity<>(compliance.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("")
    public ResponseEntity<Compliance> putComplianceData(@RequestBody Compliance compliance) {
//        Compliance complianceData = new Compliance();
//        complianceData.setEnv("PROD");
//        complianceData.setStatus("PASS");
//        complianceData.setTotal(50);
//        complianceData.setTotalPassed(50);
//        complianceData.setFailed(0);
//        complianceData.setProjectName("External Gateway");
//        complianceData.setReport(null);
        return new ResponseEntity<Compliance>(complianceRepo.save(compliance), HttpStatus.CREATED);
    }
}
