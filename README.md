# INFNOVA Course API Challenge

A simple, RESTful Course API built with NestJS as part of the INFNOVA Backend Internship Mini-Challenge. This project demonstrates a clean architecture, strict data validation, and comprehensive automated testing.

## Features

-   **CRUD Operations**: Complete endpoints for courses (`GET`, `POST`, `PATCH`, `DELETE`).
-   **Strict Validation**: Enforces exact data structures using `ValidationPipe` with `whitelist` and `forbidNonWhitelisted` enabled.
-   **CORS Enabled**: Configured to allow cross-origin requests for frontend integration.
-   **API Documentation**: Interactive Swagger UI available at `/docs`.
-   **Modern Architecture**: Following NestJS best practices with modular separation of concerns.

## Architecture

The application follows a modular structure aligned with NestJS best practices:

-   **CourseModule**: Feature boundary for all course-related logic.
-   **CourseController**: Handles HTTP requests and delegates logic to the service layer.
-   **CourseService**: Contains business logic and manages in-memory data.
-   **DTOs**: Define and validate request payload structure using `class-validator` and `class-transformer`.

## Data Model

Example Course Object:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Intro to HTML",
  "level": "Beginner",
  "durationInWeeks": 4
}
```

## Setup Instructions

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd infnova-course-api
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the development server**:
    ```bash
    npm run start:dev
    ```

2.  **Access the API**:
    -   Base URL: `http://localhost:3000`
    -   **Swagger Documentation**: Open `http://localhost:3000/docs` in your browser to interact with the API endpoints.

## Project Structure

```text
src/
├── course/
│   ├── dto/                # Data Transfer Objects for validation
│   ├── entities/           # Data models
│   ├── course.controller.ts # Route handlers & Swagger tags
│   ├── course.service.ts    # Business logic & in-memory storage
│   └── course.module.ts     # Course module configuration
├── main.ts                 # App entry point (CORS, Pipes, Swagger)
└── app.module.ts           # Root application module
```

## API Endpoints

-   `GET /courses` - Get a list of all courses.
-   `GET /courses/:id` - Get a specific course by ID.
-   `POST /courses` - Create a new course.
-   `PATCH /courses/:id` - Partially update a specific course by ID.
-   `DELETE /courses/:id` - Delete a specific course by ID.

### Validation Rules for Creation (`POST`)

-   `title`: `string` (Required, non-empty)
-   `level`: `enum` (`Beginner`, `Intermediate`, `Advanced`)
-   `durationInWeeks`: `number` (Required, minimum 1)

## Error Handling

Example `404 Not Found` Response:

```json
{
  "statusCode": 404,
  "message": "Course with ID 999 not found",
  "error": "Not Found"
}
```

## Testing

Unit tests are provided for:

-   **CourseService**: Business logic and state management.
-   **CourseController**: HTTP delegation layer using a mocked service.

```bash
# Run all tests
npm run test

# Check test coverage
npm run test:cov
```

## Available Scripts

-   `npm run start` – Start application
-   `npm run start:dev` – Start in development mode (hot reload)
-   `npm run test` – Run unit tests
-   `npm run test:cov` – Run tests with coverage report

## Design Decisions

-   **In-memory storage** is used to keep the project simple and focused on architecture.
-   **Business logic** is isolated in the service layer for maximum testability.
-   **Controller** contains no business logic and only delegates to the service.
-   **Dependency Injection** is used throughout to promote modularity and maintainability.
-   **Strict Pipes** (`forbidNonWhitelisted`) ensure that consumers cannot send unexpected data.

## Challenge Requirements Handled

-   ✅ **Core Stack**: Built with NestJS and TypeScript.
-   ✅ **Data Integrity**: DTOs + `class-validator` + `class-transformer`.
-   ✅ **Standardized Responses**: Proper HTTP status codes (`200`, `201`, `400`, `404`).
-   ✅ **Clean Code**: SOLID principles and modular project structure.
-   ✅ **Bonus - Full CRUD**: Implemented `PATCH` and `DELETE` endpoints.
-   ✅ **Bonus - Documentation**: Interactive Swagger UI at `/docs`.
-   ✅ **Bonus - Testing**: Comprehensive unit tests for services and controllers.
-   ✅ **Bonus - UX**: Global CORS and strict validation for better API reliability.
