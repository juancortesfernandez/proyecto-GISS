package com.giss.backend.entities;

import com.giss.backend.enums.TechnologyStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "technology")  // snake_case
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Technology {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String code;
    
    @Column(nullable = false)
    private String name; // Spring Boot, Angular, MySQL, etc.
    
    private String supplier; // Oracle, Microsoft, Open Source, etc.
    
    private String version; // 17, 3.2.0, etc.

    @ManyToOne
    @JoinColumn(name = "domain_id") // Relación con el dominio tecnológico
    private TechDomain domain;
    
    @Enumerated(EnumType.STRING)
    private TechnologyStatus lifeCycleStatus; // ACTIVE, DEPRECATED, HOLD, EOL
    
    private Boolean active;

    @OneToMany(mappedBy = "technology")
    private List<AppTypePlatformTechnology> platformTechnologies;

    
}