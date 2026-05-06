# CLAUDE.md — React + FastAPI + SQLite Stack

This file governs how Claude Code works across every project using this stack.
Project-specific context lives in `docs/PROJECT.md` inside each repo.

---

## Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | ReactJS (Vite), fetch API               |
| Backend    | Python 3.11+, FastAPI, Uvicorn          |
| ORM        | SQLAlchemy 2.x (async-capable)          |
| Database   | SQLite (file-based, dev/test/prod)      |
| Testing    | PyTest + httpx (async test client)      |
| Linting    | Ruff (Python), ESLint + Prettier (JS)   |

---

## Project Layout

```
project-root/
├── CLAUDE.md               ← this file
├── docs/
│   └── PROJECT.md          ← domain context (models, rules, endpoints)
├── backend/
│   ├── main.py             ← FastAPI app factory
│   ├── database.py         ← SQLAlchemy engine + session
│   ├── models/             ← ORM models (one file per domain entity)
│   ├── schemas/            ← Pydantic request/response schemas
│   ├── routers/            ← APIRouter modules (one per resource)
│   ├── services/           ← Business logic (no DB calls in routers)
│   ├── tests/
│   │   ├── conftest.py     ← shared fixtures (engine, client, session)
│   │   └── test_*.py       ← one file per router/service
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/            ← fetch wrappers (one file per resource)
    │   ├── components/     ← reusable UI components
    │   ├── pages/          ← route-level components
    │   └── hooks/          ← custom React hooks
    ├── package.json
    └── vite.config.js
```

---

## Running the Stack

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev          # runs on :5173, proxies /api → :8000

# Tests
cd backend
pytest -v --tb=short

# Lint
ruff check .         # Python
npm run lint         # JS/React
```

---

## Skills

Claude Code loads these skills on demand. Read the relevant SKILL.md before
generating code for that layer.

| Task                          | Skill path                              |
|-------------------------------|-----------------------------------------|
| FastAPI routers / app factory | `.claude/skills/fastapi/SKILL.md`       |
| SQLAlchemy models / sessions  | `.claude/skills/sqlalchemy-sqlite/SKILL.md` |
| PyTest fixtures / test cases  | `.claude/skills/pytest/SKILL.md`        |
| React components / pages      | `.claude/skills/reactjs/SKILL.md`       |
| API contract / integration    | `.claude/skills/fullstack-integration/SKILL.md` |

---

## Hard Rules

- **Never** put business logic in a router. It belongs in `services/`.
- **Never** import a router module from another router.
- **Never** call the DB directly from a React component — always go through `src/api/`.
- **Never** commit a `.env` file or hard-coded secrets.
- All new backend endpoints **must** have at least one PyTest test before the task is considered done.
- All Pydantic schemas live in `schemas/`, never inline in routers.
- SQLite database file is `.gitignore`d.

---

## Environment Variables

```
# backend/.env
DATABASE_URL=sqlite+aiosqlite:///./dev.db
SECRET_KEY=changeme

# frontend/.env
VITE_API_BASE=/api
```

---

## Conventions

- Python: snake_case everywhere. Classes: PascalCase.
- JS/React: camelCase for variables/functions, PascalCase for components.
- API routes: plural nouns, kebab-case. `/api/user-profiles/`, not `/api/userProfile/`.
- HTTP verbs: GET (read), POST (create), PUT (full replace), PATCH (partial update), DELETE.
- All timestamps: UTC ISO 8601 strings in API responses.
