@echo off
echo Starting NeuroNest AI Architecture...

echo [1/2] Launching Spring Boot MySQL Backend (Port 8080)...
start "NeuroNest Backend" cmd /k "cd neuronest ; .\mvnw.cmd spring-boot:run"

echo [2/2] Launching React Vite Frontend (Port 5173)...
start "NeuroNest Frontend" cmd /k "cd frontend ; npm run dev"

echo All services are starting up! Keep both command windows open.
pause
