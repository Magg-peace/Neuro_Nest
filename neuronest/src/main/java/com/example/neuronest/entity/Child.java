package com.example.neuronest.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private Integer age;
    private String conditionType; // ADHD, Autism, Dyslexia
    private String learningStyle;
    private String interests;
    private String attentionSpan;
    private String strengths;
    private String goals;
    
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Parent parent;
    
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
    
    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL)
    private List<LearningSession> sessions;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getConditionType() { return conditionType; }
    public void setConditionType(String conditionType) { this.conditionType = conditionType; }
    public String getLearningStyle() { return learningStyle; }
    public void setLearningStyle(String learningStyle) { this.learningStyle = learningStyle; }
    public String getInterests() { return interests; }
    public void setInterests(String interests) { this.interests = interests; }
    public String getAttentionSpan() { return attentionSpan; }
    public void setAttentionSpan(String attentionSpan) { this.attentionSpan = attentionSpan; }
    public String getStrengths() { return strengths; }
    public void setStrengths(String strengths) { this.strengths = strengths; }
    public String getGoals() { return goals; }
    public void setGoals(String goals) { this.goals = goals; }
    public Parent getParent() { return parent; }
    public void setParent(Parent parent) { this.parent = parent; }
    public Teacher getTeacher() { return teacher; }
    public void setTeacher(Teacher teacher) { this.teacher = teacher; }
    public List<LearningSession> getSessions() { return sessions; }
    public void setSessions(List<LearningSession> sessions) { this.sessions = sessions; }
}
