# StudyFlow

A learning task management system for students.

## Project Overview

StudyFlow is a task management system designed for students to manage their learning tasks, track progress, and receive reminders.

## Features

- Create, update, and manage learning tasks
- Set task priorities (High, Medium, Low)
- Track task status (Todo, In Progress, Completed)
- Set reminders for due tasks
- View task statistics and progress reports

## System Architecture

```
src/
├── domain/          # Core business logic, entities, value objects
├── application/     # Use cases, DTOs
├── infrastructure/ # Persistence, external services
├── interfaces/     # API controllers, CLI handlers
```

## Domain Model

### Core Entities
- **User**: System user with unique identity
- **Task**: Core entity representing a learning task
- **TaskList**: Collection of related tasks

### Value Objects
- **Priority**: Task priority (HIGH, MEDIUM, LOW)
- **TaskStatus**: Task status (TODO, IN_PROGRESS, COMPLETED)
- **ReminderPolicy**: Reminder rules

### Business Invariants
1. Task due date cannot be earlier than creation date
2. Completed tasks cannot be changed back to TODO status
3. High priority tasks must have a due date

## Getting Started

### Prerequisites
- Node.js v20+
- npm or yarn
- Git

### Installation

```bash
npm install
```

### Build

```bash
npm run build
```

### Run

```bash
npm start
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test
```

## Module Responsibilities

### domain/
- Encapsulates core business logic and rules
- Contains entities, value objects, domain service interfaces

### application/
- Orchestrates domain objects to complete use cases
- Contains use case classes, DTOs

### infrastructure/
- Provides persistence and technical services
- Contains database implementations, message queues

### interfaces/
- Handles external requests and result presentation
- Contains REST controllers, CLI handlers