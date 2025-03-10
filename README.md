# Qubika Sports Club Management System - End-to-End Testing

This repository contains the end-to-end (E2E) tests for the Qubika Sports Club Management System. The objective of these tests is to ensure that both the API and UI interactions work seamlessly together to provide a smooth user experience.

## Overview

The tests cover a variety of workflows within the system, including user creation via API, logging in through the UI, and interacting with category-related features such as category and subcategory creation.

## Why Cypress?

Cypress is a powerful, fast, and easy-to-use testing framework for end-to-end testing, particularly for single-page applications like the Qubika Sports Club Management System. It allows you to write tests that simulate real user interactions with the UI and also provides robust support for API testing.

### Key Benefits of Cypress:
- **Time Travel**: Cypress allows you to pause and inspect the state of the application at any point during the test.
- **Real-Time Reloads**: As you write tests, Cypress instantly reloads and runs them.
- **Network Traffic Control**: It allows you to stub and intercept network requests easily, which is critical when testing APIs and validating responses.
- **Automatic Waiting**: Cypress automatically waits for elements to be visible before interacting with them, reducing the need for manual waits in tests.

## How Page Object Model (POM) is Applied

In this project, we use the **Page Object Model (POM)** design pattern to organize the tests and maintain clean code. POM is a software design pattern that promotes separating the test logic from the interaction with the UI elements (locators). It helps make the tests more maintainable and easier to scale as the project grows.

### POM Benefits:
- **Separation of Concerns**: Each page or section of the application is represented by a page object that handles interactions with the page, such as filling in forms, clicking buttons, etc.
- **Reusability**: Methods defined in the page objects can be reused across multiple test cases, avoiding duplication of code.
- **Maintainability**: If the UI changes (e.g., element locators), only the page object needs to be updated, rather than every individual test case.
- **Cleaner Tests**: The tests themselves are much cleaner and easier to understand, focusing on the "what" rather than the "how" of interacting with the UI.

### How POM is Structured in This Project:
- **Page Objects**: Each page object encapsulates the interactions with a specific section of the application, such as the login page or the category management page.
- **Custom Commands**: In addition to page objects, we define custom commands in `commands.js` to handle tasks like generating random user data or interacting with the API. This keeps the tests DRY (Don't Repeat Yourself) and simplifies test writing.

## How To Run the Tests

To run the tests locally, follow these steps:

### Prerequisites

1. **Install Node.js**: Make sure Node.js is installed on your machine. If not, you can download it from [nodejs.org](https://nodejs.org/).

2. **Install Cypress**: You need to install Cypress to run the tests. Use the following command to install it in your project:

   ```bash
   npm install cypress

3.**Run Cypress**: Once Cypress is installed, you can run the tests using the following command:

 ```bash
npx cypress open
```
This will open the Cypress Test Runner where you can select and run individual test cases.

Project Structure
The project is organized in a modular way using Page Object Model (POM) for easy maintainability and scalability.

cypress/e2e/: Contains the actual test files for each feature.
cypress/support/pages/: Contains the page objects for the login and category management pages.
