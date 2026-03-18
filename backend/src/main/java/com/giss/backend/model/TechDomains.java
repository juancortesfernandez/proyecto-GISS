package com.giss.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "tech_domain")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TechDomain {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    private String description;

    private Boolean active;
    
    @OneToMany(mappedBy = "domain")
    private List<Technology> technologies;
}