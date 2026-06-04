package com.hugo.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface Repository extends JpaRepository<Score, Long> {

    List<Score> findTop10ByOrderByPointsDesc();
}
