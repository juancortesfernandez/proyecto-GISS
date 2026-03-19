package com.giss.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "app_Types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;
    
    @Column(nullable = false, unique = true)
    private String name; // BACKEND_SPRINGBOOT, FRONT_ANGULAR, LOW_CODE, etc.
    
    private String description;

    private boolean active;

    @OneToMany(mappedBy = "appType")
    private List<AppTypePlatformTechnology> platformTechnologies;



}