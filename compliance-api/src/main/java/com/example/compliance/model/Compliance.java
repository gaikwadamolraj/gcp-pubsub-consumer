package com.example.compliance.model;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Compliance {
    @Id
    @GeneratedValue()
    private long id;

    private String projectName;
    private String env;
    private String status;
    private int totalPassed;
    private int total;
    private int failed;

    @Lob
    private Blob report;

}
