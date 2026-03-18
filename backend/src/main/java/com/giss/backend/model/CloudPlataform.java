package com.giss.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "cloud_platform")  // snake_case
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CloudPlatform {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String code; // AZURE, AWS, GOOGLE CLOUD
    
    private String name;
    
    private Boolean active;

    // Relación uno a muchos con AppTypePlataformTechnology
    @OneToMany(mappedBy = "cloudPlatform")
    private List<AppTypePlatformTechnology> platformTechnologies;
}