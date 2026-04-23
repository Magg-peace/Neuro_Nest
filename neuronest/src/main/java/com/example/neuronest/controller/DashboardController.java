package com.example.neuronest.controller;

import com.example.neuronest.repository.ChildRepository;
import com.example.neuronest.repository.LearningSessionRepository;
import com.example.neuronest.repository.ParentRepository;
import com.example.neuronest.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private ParentRepository parentRepository;
    @Autowired
    private LearningSessionRepository sessionRepository;
    @Autowired
    private ChildRepository childRepository;

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<?> getParentDashboard(@PathVariable Long parentId) {
        // Return structured data for the dashboard UI
        return ResponseEntity.ok(Map.of(
            "totalSessions", 42,
            "avgScore", 85,
            "engagement", "High",
            "sessions", java.util.List.of(
                Map.of("topic", "Space Explorers", "score", 100, "mood", "Happy", "time", "10 mins ago"),
                Map.of("topic", "Dinosaur Math", "score", 60, "mood", "Frustrated", "time", "Yesterday")
            ),
            "insights", Map.of(
                "strengths", "Excels at visual learning and pattern recognition.",
                "weaknesses", "Focus tends to wander during text-heavy reading.",
                "recommendation", "Attention span drops after 15 minutes. Automatically injecting 'Moment of Calm' breaks has improved retention by 40%."
            )
        ));
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<?> getTeacherDashboard(@PathVariable Long teacherId) {
        return ResponseEntity.ok(Map.of(
            "studentsAssigned", 12,
            "classAvgScore", 78,
            "needsAttentionCount", 2,
            "roster", java.util.List.of(
                Map.of("name", "Alex", "age", 7, "condition", "ADHD", "style", "Visual Learner", "status", "Excelling"),
                Map.of("name", "Mia", "age", 6, "condition", "Autism", "style", "Auditory Learner", "status", "Needs Call")
            ),
            "recommendation", "Mia is struggling with auditory comprehension today. AI suggests switching her modules to Visual Mode for the next 48 hours to reduce cognitive overload."
        ));
    }
}
