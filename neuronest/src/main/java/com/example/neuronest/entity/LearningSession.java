package com.example.neuronest.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class LearningSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String topic;
    private Integer score;
    private String mood;
    private Integer timeSpentMinutes;
    private LocalDateTime sessionDate = LocalDateTime.now();
    
    @ManyToOne
    @JoinColumn(name = "child_id")
    private Child child;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }
    public Integer getTimeSpentMinutes() { return timeSpentMinutes; }
    public void setTimeSpentMinutes(Integer timeSpentMinutes) { this.timeSpentMinutes = timeSpentMinutes; }
    public LocalDateTime getSessionDate() { return sessionDate; }
    public void setSessionDate(LocalDateTime sessionDate) { this.sessionDate = sessionDate; }
    public Child getChild() { return child; }
    public void setChild(Child child) { this.child = child; }
}
