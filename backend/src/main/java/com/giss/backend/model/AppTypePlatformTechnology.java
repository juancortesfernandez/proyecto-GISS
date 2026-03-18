package com.giss.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "app_type_platform_technology") // CORREGIDO: snake_case
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppTypePlatformTechnology {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "app_type_id")
    private AppType appType;
    
    @ManyToOne
    @JoinColumn(name = "cloud_platform_id")
    private CloudPlatform cloudPlatform;
    
    @ManyToOne
    @JoinColumn(name = "technology_id")
    private Technology technology;
    
    private Boolean allowed;
    
    private Boolean recommended;
    
    private Boolean mandatory;
    
    private String notes;

    
}