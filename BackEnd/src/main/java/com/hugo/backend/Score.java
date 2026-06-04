package com.hugo.backend;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_scores")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String player;

    @Column(nullable = false)
    private Integer points;

    private LocalDateTime createdAt;

    // Executado automaticamente antes de salvar no banco
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

}