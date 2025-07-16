@echo off
echo Starting ConstructFlow Desktop Application...
echo.
echo Checking dependencies...
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

echo.
echo Launching ConstructFlow...
npm start

pause