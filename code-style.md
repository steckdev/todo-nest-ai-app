# Code Style Guide

This document outlines the coding standards and best practices for this codebase. When possible avoid describing everything and provide code samples. Also avoid comments anywhere in the code so that we don't have to delete them we can use version control to see the differences.

## General Guidelines

- Write clear, readable, and maintainable code.
- Follow the DRY (Don't Repeat Yourself) principle.
- Use meaningful and descriptive names for variables, functions, and classes.

## Indentation

- Use 2 spaces for indentation.
- Do not use tabs.

## Line Length

- Limit lines to 120 characters.
- Break long lines into multiple lines where necessary.
- Biome formatting will be applied automatically on save

## Naming Conventions

- Use `camelCase` for variable and function names.
- Use `PascalCase` for class names.
- Use private readonly `UPPER_SNAKE_CASE` for constants.

## Functions

- Keep functions small and focused on a single task.
- Use descriptive names for functions.

## Classes

- Use classes to encapsulate related data and functions.
- Prefer multiple classes to keep related behavior to a single purpose.
- Follow the Single Responsibility Principle (SRP) - a class should have only one reason to change.
- Use inheritance and composition appropriately.
- Prefer interfaces and design patterns that follow SOLID principles

## Comments

- Avoid any comments in the code, only rarely use for external domain logic.
- Prefer meaningful names and functions to compartmentalize the logic.
- Use `//` for single-line comments and `/* ... */` for multi-line comments.

## Error Handling

- Use exceptions for error handling.
- Catch exceptions at appropriate levels and provide meaningful error messages.
- Avoid using exceptions for control flow.

## Testing

- Write unit tests for all new code in service, controller, strategy, and factories.
- Ensure tests cover edge cases and potential failure points.
- Use descriptive names for test functions.
- Following the given - should pattern for tests
- Use `jest` for testing.
- Mock dependencies using `jest-mock-extended`.
- Use the test/sharedTestConstants.ts for constants that would exist in other test files such as userId, fileId, or other generic values
- Use constants at the top of the file to keep the test as concise as possible.

## Version Control

- Commit code frequently with clear and concise commit messages.
- Use branches to create a merge request for main branch.
- Merge changes to the main branch only after product design review,code review and tests.

## Language-Specific Guidelines


### JavaScript/TypeScript

- Use `const` and `let` instead of `var`.
- Prefer arrow functions for anonymous functions.
- Use template literals for string concatenation.

## Documentation

- Swagger will document the controllers and should use appropriate decorators
- The application is exported using open api cli to generate a sdk for
- Use Markdown for README and other documentation files.
- Keep documentation up-to-date with code changes.

## Code Reviews

- Review code for clean, readability, maintainability, and performance.
- Provide constructive feedback and be open to receiving feedback.
- Ensure all code is reviewed before merging to the main branch.

---

By following these guidelines, we ensure that our codebase remains clean, maintainable, and scalable.
