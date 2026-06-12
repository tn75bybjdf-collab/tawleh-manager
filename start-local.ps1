$ErrorActionPreference = "Stop"

$ProjectPath = "C:\Users\HP\Desktop\tawleh-manager"
Set-Location $ProjectPath

Write-Host ""
Write-Host "Starting Tawleh Manager..." -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path "node_modules")) {
  Write-Host "Installing packages first..." -ForegroundColor Yellow
  npm install
}

Start-Process "http://localhost:3000"
npm run dev

Read-Host "Press Enter to close"

