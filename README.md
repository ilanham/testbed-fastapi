# testbed-fastapi

A minimal full-stack CRUD testbed: React + Vite frontend, FastAPI backend, SQLAlchemy ORM, SQLite.

## Prerequisites

- [uv](https://docs.astral.sh/uv/getting-started/installation/) — Python toolchain
- Node.js 20+ and npm
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose plugin) — for containerised runs

## Backend setup

```bash
cd backend
uv venv
uv pip install -r requirements.txt
```

Copy the env file and edit if needed:

```bash
cp .env.example .env
```

Start the server:

```bash
uv run uvicorn main:app --reload --port 8000
```

API docs are available at [http://localhost:8000/docs](http://localhost:8000/docs).

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173) and proxies `/api` requests to the backend.

## Docker Compose

Builds the backend and a production nginx-served frontend, wires them together, and persists the SQLite database in a named volume.

```bash
docker compose up --build
```

| Service  | URL                                          |
|----------|----------------------------------------------|
| Frontend | [http://localhost:5173](http://localhost:5173) |
| Backend  | [http://localhost:8000](http://localhost:8000) |
| API docs | [http://localhost:8000/docs](http://localhost:8000/docs) |

Stop and remove containers:

```bash
docker compose down
```

To also delete the persisted database volume:

```bash
docker compose down -v
```

---

## Tests

```bash
cd backend
uv run pytest -v --tb=short
```

Tests use an isolated in-memory SQLite database — no dev database is touched.

## Project structure

```
backend/
├── main.py              # app factory, lifespan, CORS, router mounts
├── database.py          # async engine, Base, get_session dependency
├── models/item.py       # SQLAlchemy ORM model
├── schemas/item.py      # Pydantic request/response schemas
├── services/            # business logic (no DB calls in routers)
├── routers/items.py     # REST endpoints — calls services only
└── tests/               # pytest, in-memory SQLite, httpx async client

frontend/src/
├── api/items.js         # fetch wrappers
├── hooks/useItems.js    # loading/error state, add/remove
├── components/          # ItemForm, ItemList
└── pages/ItemsPage.jsx  # composes hook + components
```

## API endpoints

| Method | Path              | Description    |
|--------|-------------------|----------------|
| GET    | /api/items/       | List all items |
| POST   | /api/items/       | Create item    |
| GET    | /api/items/{id}   | Get item       |
| PATCH  | /api/items/{id}   | Update item    |
| DELETE | /api/items/{id}   | Delete item    |
