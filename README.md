# API_JS_Playwright

## Table of Contents
1. Getting Started
2. Usage
3. Contributing
4. License

## Getting Started and Pre-Requisites
1. Install Node
2. VS COde
3. Clone the repo
4. Run npm i to install all the dependencies

## Project Workspace
### Data Folder
Contains test data to be used for testing and validation.

### Utils
Contains base class for sending out requests such as POST, GET etc
This has functions for generating token, booking creation and fetching the booking details

### Tests
#### E2E Tests
Contains 3 E2E tests. 
The first generates token.
The Second test creates the booking
The Last Test fetches the booking details created

#### Negative Test
Contains 1 negative testing
Validates if the user id and password is not correct then token does not get created

### Execution Results
index.html file is present under playwright-report folder. This can be viewed in any browser
Expand the line items to view in details

### Config
**playwright.config.js** has all the configs realted to execution, retries, screenshot capturing etc.
This can be customized to execute UI tests in safari, chrome, edge , firefox, browser stack etc.
This is the heart of the project

### Running the Scripts
pakage.json has the custom scripts
"RunE2ETest": "npx playwright test /tests/E2E Test/E2E-Booking-api-test.spec.js",
"RunNegativeTestTokenGeneration": "npx playwright test /tests/Negative Tests/TokenGenerationNegativeTesting.js",
"RunAllTests" : "npx playwright test"

#### To run all tests execute the command --> npm run RunAllTests
#### To run negative tests execute the command --> npm run RunNegativeTestTokenGeneration

## API Documentation 
**https://restful-booker.herokuapp.com/apidoc/index.html#api-Auth**

## Playwright Documentation
**https://playwright.dev/docs/intro**








