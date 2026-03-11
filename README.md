# Realtime Movie Recommender (FastAPI + Gemini + TMDB)

A simple Netflix-style web app with realtime search and smart recommendations:
- FastAPI backend with TMDB for movie data
- Gemini embeddings for semantic recommendations
- Minimal frontend with trending/top rows and query-based suggestions

## Abstract
This project is a lightweight movie discovery app that combines TMDB's catalog with Gemini's semantic embeddings to deliver smarter, more relevant recommendations. The FastAPI backend exposes search, details, trending, and top-rated endpoints, plus recommendation routes that re-rank TMDB candidates using vector similarity from Gemini embeddings. A minimal HTML/JS frontend provides a Netflix-like experience with instant results and responsive browsing.

## Data Flow Diagram
```mermaid
flowchart TD
  U[User in Browser] -->|Types query / clicks| FE[Frontend (HTML/CSS/JS)]

  FE -->|HTTP (fetch)| BE[(FastAPI Backend)]

  subgraph Backend Services
    TMDBS[services/tmdb.py\nTMDB client]
    GEMS[services/gemini.py\nEmbedding client]
    CACHE[(In-memory cache)]
  end

  %% Search & metadata flows
  BE -->|/api/search, /api/movie, /api/trending, /api/top_rated| TMDBS
  TMDBS -->|REST| TMDBAPI[(TMDB API)]
  TMDBAPI --> TMDBS --> BE --> FE --> U

  %% Recommendations flows
  BE -->|/api/recommendations/{id}| TMDBS
  TMDBS --> TMDBAPI --> TMDBS
  BE -->|needs embeddings| GEMS
  GEMS -->|vector| BE
  BE -->|re-ranks candidates| BE
  BE --> FE --> U

  %% Caching
  BE <--> CACHE
```

## 1) Prerequisites
- Python 3.10+
- TMDB API Key: https://www.themoviedb.org/settings/api
- Gemini API Key: https://ai.google.dev

## 2) Project setup
Create a file named `.env` in the project root with:

```
TMDB_API_KEY=your_tmdb_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

Install dependencies (Windows PowerShell):

```
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## 3) Run the dev server

```
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

Open `http://localhost:8000` to use the app.

## 4) API Endpoints
- `GET /api/search?q=...` – TMDB movie search
- `GET /api/movie/{movie_id}` – Movie details
- `GET /api/trending` – Weekly trending
- `GET /api/top_rated` – Top rated
- `GET /api/recommendations/{movie_id}?limit=20` – Similar movies re-ranked with embeddings
- `GET /api/query_recommendations?q=...&limit=20` – Semantic suggestions for a free-text query

## 5) Notes
- Images served from TMDB (`https://image.tmdb.org/t/p/...`).
- Gemini model used: `text-embedding-004`.
- Simple in-memory cache for computed embeddings.

## 6) Troubleshooting
- If startup fails with `TMDB_API_KEY is required` or `GEMINI_API_KEY is required`, check your `.env` values and restart.
- If images do not load, ensure the TMDB id has a `poster_path` or `backdrop_path`.


cd "C:\Users\atul1\OneDrive\Desktop\Movie Recommended System" && .\.venv\Scripts\Activate.ps1 && uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
