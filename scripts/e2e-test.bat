@echo off

REM Windows script for running e2e tests
REM You have to run server and capture some browser first
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Karma (npm install -g karma)

set BASE_DIR=%~dp0

CLS
@echo Running Test Suite Files

node "%BASE_DIR%\..\node_modules\protractor\bin\protractor"  "%BASE_DIR%\..\config\protractor.conf.js" %*

@echo e2e test suite complete