@echo off
echo Iniciando el servidor React + Vite para DashboardPurbana...
cd /d "C:\Users\GERENCIA\.gemini\antigravity\scratch\DashboardPurbana"

:: Abre el navegador predeterminado en localhost:8000
start http://localhost:8000

:: Inicia el servidor de desarrollo de Vite en el puerto 8000 expuesto a la red local
npm run dev
