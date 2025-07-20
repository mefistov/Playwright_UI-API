# Playwright UI-API Testing Framework

This repository contains an automated testing framework built with Playwright for both UI and API testing. The framework is designed to test the [Automation Exercise](https://automationexercise.com) website.

## Features

- UI testing with Page Object Model pattern
- API testing capabilities
- Test data generation
- Environment configuration
- Allure reporting
- Smoke and regression test suites

## Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mefistov/Playwright_UI-API.git
   cd Playwright_UI-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Configuration

The framework uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```
BASE_URL = https://automationexercise.com
EXISTING_EMAIL = your-existing-email@example.com
VERSION = V2
CONTENT_TYPE = application/json
```

## Project Structure

```
Playwright_UI-API/
├── src/
│   ├── test_steps/
│   │   ├── api/         # API test steps
│   │   └── ui/          # UI test steps
│   ├── tests/           # Test files
│   └── utils/
│       └── recources/
│           └── pages/   # Page Object Models
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
└── playwright.config.ts # Playwright configuration
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run smoke tests
```bash
npm run test:smoke
```

### Run regression tests
```bash
npm run test:regression
```

## Reporting

The framework uses Allure for reporting. After running tests, generate and open the report with:

```bash
npm run allure:report
```

Or generate and open separately:

```bash
npm run allure:generate
npm run allure:open
```

## Test Architecture

### Page Object Model

The framework implements the Page Object Model pattern to separate test logic from page interactions:

- **Page Objects**: Located in `src/utils/recources/pages/`, these classes encapsulate the page structure and provide methods for interacting with page elements.
- **Test Steps**: Located in `src/test_steps/`, these classes provide higher-level steps that combine multiple page interactions.
- **Tests**: Located in `src/tests/`, these files contain the actual test cases using the test steps.

### Test Data Generation

The framework includes utilities for generating test data dynamically, making tests more robust and independent.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.