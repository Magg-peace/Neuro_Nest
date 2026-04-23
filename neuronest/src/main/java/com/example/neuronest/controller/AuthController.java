package com.example.neuronest.controller;

import com.example.neuronest.entity.Child;
import com.example.neuronest.entity.Parent;
import com.example.neuronest.repository.ChildRepository;
import com.example.neuronest.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private ChildRepository childRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerParent(@RequestBody Map<String, Object> payload) {
        try {
            // Very simplified Auth logic for Hackathon/MVP scope
            String email = (String) payload.get("email");
            String password = (String) payload.get("password");
            
            if (parentRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
            }

            Parent parent = new Parent();
            parent.setEmail(email);
            parent.setPassword(password); // Note: In production use BCrypt!
            parent = parentRepository.save(parent);

            // Handle optional child setup if attached
            if (payload.containsKey("childData")) {
                Map<String, Object> childData = (Map<String, Object>) payload.get("childData");
                Child child = new Child();
                child.setName((String) childData.get("name"));
                child.setAge(childData.get("age") != null && !((String)childData.get("age")).isEmpty() ? Integer.parseInt((String) childData.get("age")) : 0);
                child.setConditionType((String) childData.get("condition"));
                child.setLearningStyle((String) childData.get("learningStyle"));
                child.setInterests((String) childData.get("interests"));
                child.setAttentionSpan((String) childData.get("attentionSpan"));
                child.setStrengths((String) childData.get("strengths"));
                child.setGoals((String) childData.get("goals"));
                child.setParent(parent);
                childRepository.save(child);
            }

            return ResponseEntity.ok(Map.of(
                "message", "User registered successfully",
                "id", parent.getId(),
                "email", parent.getEmail()
            ));
        } catch(Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginParent(@RequestBody Map<String, String> creds) {
        String email = creds.get("email");
        String password = creds.get("password");
        
        Optional<Parent> parentOpt = parentRepository.findByEmail(email);
        if (parentOpt.isPresent() && parentOpt.get().getPassword().equals(password)) {
            return ResponseEntity.ok(Map.of(
                "id", parentOpt.get().getId(),
                "email", parentOpt.get().getEmail()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }
}
