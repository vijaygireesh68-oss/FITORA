@echo off
title FITORA - Elite Fitness and Nutrition Management System
color 06

echo =======================================================================
echo          FITORA -- FITNESS AND NUTRITION MANAGEMENT SYSTEM
echo =======================================================================
echo.
echo Launching FITORA in your web browser...
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python detected. Starting Fitora server on http://localhost:8000 ...
    start "" http://localhost:8000
    python app.py
) else (
    echo Python not found in PATH. Opening Fitora directly in your default browser...
    start "" "%~dp0index.html"
)

pause
