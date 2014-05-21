@echo off
set BASE_DIR=%~dp0
cls
@echo Starting Selenium...
java -jar "%BASE_DIR%../test/selenium/selenium-server-standalone-2.33.0.jar" -Dwebdriver.chrome.driver="%BASE_DIR%../test/selenium/chromedriver.exe"
