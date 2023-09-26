package com.example.compliance.model;

import java.sql.Blob;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Compliance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
