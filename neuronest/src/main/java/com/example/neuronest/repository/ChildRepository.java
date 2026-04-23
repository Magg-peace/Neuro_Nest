package com.example.neuronest.repository;

import com.example.neuronest.entity.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findByParentId(Long parentId);
    List<Child> findByTeacherId(Long teacherId);
}
