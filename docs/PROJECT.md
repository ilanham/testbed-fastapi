# Project: Items Testbed

A minimal CRUD testbed demonstrating the React + FastAPI + SQLAlchemy + SQLite stack.

## Domain Model

### Item

| Field       | Type     | Notes                     |
|-------------|----------|---------------------------|
| id          | int      | Primary key, auto-inc     |
| name        | str(255) | Required                  |
| description | str|None | Optional, unbounded text  |
| created_at  | datetime | UTC, server-set on insert  |
| updated_at  | datetime | UTC, server-set on insert/update |

## API Endpoints

| Method | Path            | Status | Description     |
|--------|-----------------|--------|-----------------|
| GET    | /api/items/     | 200    | List all items  |
| POST   | /api/items/     | 201    | Create an item  |
| GET    | /api/items/{id} | 200    | Get item by ID  |
| PATCH  | /api/items/{id} | 200    | Update item     |
| DELETE | /api/items/{id} | 204    | Delete item     |

## Business Rules

- `name` is required and cannot be empty.
- `description` is optional.
- Items are returned newest-first (descending `created_at`).
- PATCH supports partial update — only provided fields are changed.
