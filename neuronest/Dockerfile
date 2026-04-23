# Use lightweight Java image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy jar file into container
COPY target/*.jar app.jar

# Expose port (Render uses 8080 internally)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
