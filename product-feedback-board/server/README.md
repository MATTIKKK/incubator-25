# Product Feedback Board Backend

This is the FastAPI backend for the Product Feedback Board application.

## Setup

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set up PostgreSQL:

- Create a database named `feedback_board`
- Update the `DATABASE_URL` in `src/config.py` if needed

4. Run the application:

```bash
cd src
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:

- Interactive API docs: `http://localhost:8000/docs`
- Alternative API docs: `http://localhost:8000/redoc`

## Available Endpoints

### Authentication

- POST `/token` - Get access token (login)
- POST `/users/` - Create new user

### Categories

- GET `/categories/` - List all categories
- POST `/categories/` - Create new category (requires authentication)

### Ideas

- GET `/ideas/` - List all ideas
- POST `/ideas/` - Create new idea (requires authentication)
- GET `/ideas/{idea_id}` - Get specific idea

## Environment Variables

Create a `.env` file in the root directory with:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/feedback_board
SECRET_KEY=your-secret-key-please-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
