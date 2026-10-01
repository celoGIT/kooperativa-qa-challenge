Requirements Breakdown (Checklist):

[x] Tech Stack: Playwright, TypeScript, Page Object Model (POM).

[x] Test Target: Publicly available e-commerce website (of own choice).

[x] Test Data: The searched item must be parameterized and loaded from an external file (.json).

[x] Positive E2E Scenario: Searching for a specific item, adding it to the cart, and validating the cart's content.

[x] Negative Scenario: Interacting with a non-existent or unavailable item and validating the expected error state.

[x] CI/CD Integration: Configuration of an automated pipeline (e.g., GitHub Actions) to automatically run tests upon code push.

[x] Reporting: Generating and saving a test execution report from the pipeline.

[x] Documentation: Summary of the chosen approach, architecture, obstacles, and technical decisions in the README.

Architecture and Approach
Test Target (Demoblaze.com): The system was deliberately chosen due to the absence of anti-bot protections and unexpected changes on the landing page (pop-up ads, questionnaires, discount coupons). This decision eliminates non-deterministic behavior in the tests.

Reporting: The resulting HTML reports are automatically managed by the CI/CD server and saved as downloadable artifacts directly in the Actions tab of the respective repository.

Technical Decisions and Obstacles:

1. Race condition in Firefox: During the first attempt to run the positive test, an issue occurred with asynchronous waiting for a pop-up dialog. Resolved by explicitly waiting using the waitForEvent('dialog') method.

2. Negative scenario validation: The e-shop does not have a search functionality and does not return an explicit error message. Validation of the missing item is implemented by iterating through all available pages using pagination with the toBeHidden() assertion.

3. CI/CD runner performance: The second failure occurred due to the slower performance of the GitHub Actions runner. Iterating through the e-shop pages and waiting for network responses exceeded the standard 30-second limit. Resolved using test.slow().

4. False positive element: The next page button (#next2) remains visible in the DOM structure even after reaching the end of the catalog. The script clicks it in the final iteration and initializes a wait for a network response, but the backend sends no new data. Applied a 5-second timeout and a try...catch method to gracefully terminate the loop.
