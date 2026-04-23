package com.example.neuronest.repository;

import com.example.neuronest.entity.LearningSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LearningSessionRepository extends JpaRepository<LearningSession, Long> {
    List<LearningSession> findByChildId(Long childId);
}
