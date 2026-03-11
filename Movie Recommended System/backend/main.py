import os
import json
from typing import List, Dict, Any
from datetime import datetime, timedelta
import hashlib

from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from .services.tmdb import TMDBClient
from .services.gemini import GeminiEmbedder, cosine_similarity

load_dotenv()

TMDB_API_KEY = os.getenv("b96d5a972479af05802eff09488f92d1")
GEMINI_API_KEY = os.getenv("AIzaSyA8as747HsPVXVgJFNmkOgpQkoVQeHDcq0")

if not TMDB_API_KEY:
    print("[WARN] b96d5a972479af05802eff09488f92d1 not set. Set it in .env")
if not GEMINI_API_KEY:
    print("[WARN] GEMINI_API_KEY not set. Set it in .env")

app = FastAPI(title="Realtime Movie Recommender")

# CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static frontend
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
app.mount("/static", StaticFiles(directory=os.path.abspath(frontend_path), html=True), name="static")

@app.get("/")
async def root():
    with open(os.path.join(frontend_path, "index.html"), "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read(), media_type="text/html")

# Movie language/region configurations
MOVIE_REGIONS = {
    "hollywood": {
        "name": "Hollywood",
        "language": "en",
        "region": "US",
        "description": "English movies from Hollywood"
    },
    "bollywood": {
        "name": "Bollywood", 
        "language": "hi",
        "region": "IN",
        "description": "Hindi movies from Bollywood"
    },
    "punjabi": {
        "name": "Punjabi",
        "language": "pa",
        "region": "IN", 
        "description": "Punjabi movies"
    },
    "telugu": {
        "name": "Telugu",
        "language": "te",
        "region": "IN",
        "description": "Telugu movies from Tollywood"
    },
    "tamil": {
        "name": "Tamil",
        "language": "ta",
        "region": "IN",
        "description": "Tamil movies from Kollywood"
    },
    "malayalam": {
        "name": "Malayalam",
        "language": "ml",
        "region": "IN",
        "description": "Malayalam movies from Mollywood"
    },
    "kannada": {
        "name": "Kannada",
        "language": "kn",
        "region": "IN",
        "description": "Kannada movies from Sandalwood"
    }
}

# Pydantic models for user data
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    preferences: Dict[str, Any]

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: int
    name: str
    email: str
    preferences: Dict[str, Any]
    created_at: str

# In-memory user storage (in production, use a database)
USERS_FILE = "users.json"

def load_users():
    try:
        with open(USERS_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_users(users):
    with open(USERS_FILE, "w") as f:
        json.dump(users, f, indent=2)

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    return hash_password(password) == hashed

# User authentication endpoints
@app.post("/api/auth/register")
async def register_user(user_data: UserCreate):
    users = load_users()
    
    # Check if user already exists
    if any(u["email"] == user_data.email for u in users):
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    # Create new user
    new_user = {
        "id": len(users) + 1,
        "name": user_data.name,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "preferences": user_data.preferences,
        "created_at": datetime.now().isoformat()
    }
    
    users.append(new_user)
    save_users(users)
    
    # Return user data without password
    return {
        "id": new_user["id"],
        "name": new_user["name"],
        "email": new_user["email"],
        "preferences": new_user["preferences"],
        "created_at": new_user["created_at"]
    }

@app.post("/api/auth/login")
async def login_user(login_data: UserLogin):
    users = load_users()
    
    # Find user by email
    user = next((u for u in users if u["email"] == login_data.email), None)
    
    if not user or not verify_password(login_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Return user data without password
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "preferences": user["preferences"],
        "created_at": user["created_at"]
    }

@app.get("/api/auth/user/{user_id}")
async def get_user(user_id: int):
    users = load_users()
    user = next((u for u in users if u["id"] == user_id), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "preferences": user["preferences"],
        "created_at": user["created_at"]
    }

@app.put("/api/auth/user/{user_id}/preferences")
async def update_user_preferences(user_id: int, preferences: Dict[str, Any]):
    users = load_users()
    user = next((u for u in users if u["id"] == user_id), None)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["preferences"] = preferences
    save_users(users)
    
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "preferences": user["preferences"],
        "created_at": user["created_at"]
    }

# Clients
_tmdb = TMDBClient(TMDB_API_KEY or "b96d5a972479af05802eff09488f92d1")
_embedder = None
try:
    if GEMINI_API_KEY:
        _embedder = GeminiEmbedder(GEMINI_API_KEY)
    else:
        print("[WARN] GEMINI_API_KEY missing; semantic recommendations disabled")
except Exception as exc:
    print(f"[WARN] Gemini init failed, disabling embeddings: {exc}")
    _embedder = None

# Simple in-memory cache
_movie_embedding_cache: Dict[int, List[float]] = {}
_movie_brief_cache: Dict[int, Dict[str, Any]] = {}

async def get_movie_embedding(movie: Dict[str, Any]) -> List[float]:
    movie_id = movie.get("id")
    if movie_id in _movie_embedding_cache:
        return _movie_embedding_cache[movie_id]
    title = movie.get("title") or movie.get("name") or ""
    overview = movie.get("overview") or ""
    text = f"Title: {title}\nOverview: {overview}".strip()
    if not _embedder:
        return []
    embedding = await _embedder.embed_text(text)
    _movie_embedding_cache[movie_id] = embedding
    _movie_brief_cache[movie_id] = {
        "id": movie_id,
        "title": title,
        "overview": overview,
        "poster_path": movie.get("poster_path"),
        "backdrop_path": movie.get("backdrop_path"),
        "vote_average": movie.get("vote_average"),
        "release_date": movie.get("release_date"),
    }
    return embedding

# Movie region endpoints
@app.get("/api/movies/regions")
async def get_movie_regions():
    """Get available movie regions/languages"""
    return {"regions": MOVIE_REGIONS}

@app.get("/api/movies/{region}/trending")
async def get_region_trending(region: str, limit: int = 20):
    """Get trending movies for specific region"""
    if region not in MOVIE_REGIONS:
        raise HTTPException(status_code=400, detail="Invalid region")
    
    try:
        region_config = MOVIE_REGIONS[region]
        results = await _tmdb.trending(
            media_type="movie",
            time_window="week",
            language=region_config["language"],
            region=region_config["region"]
        )
        return {"results": results[:limit], "region": region_config}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/movies/{region}/top_rated")
async def get_region_top_rated(region: str, limit: int = 20):
    """Get top rated movies for specific region"""
    if region not in MOVIE_REGIONS:
        raise HTTPException(status_code=400, detail="Invalid region")
    
    try:
        region_config = MOVIE_REGIONS[region]
        results = await _tmdb.top_rated(
            language=region_config["language"],
            region=region_config["region"]
        )
        return {"results": results[:limit], "region": region_config}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/movies/{region}/popular")
async def get_region_popular(region: str, limit: int = 20):
    """Get popular movies for specific region"""
    if region not in MOVIE_REGIONS:
        raise HTTPException(status_code=400, detail="Invalid region")
    
    try:
        region_config = MOVIE_REGIONS[region]
        results = await _tmdb.popular(
            language=region_config["language"],
            region=region_config["region"]
        )
        return {"results": results[:limit], "region": region_config}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/search")
async def search_movies(q: str = Query(..., min_length=1), page: int = 1, region: str = "hollywood") -> Dict[str, Any]:
    try:
        region_config = MOVIE_REGIONS.get(region, MOVIE_REGIONS["hollywood"])
        results = await _tmdb.search(
            q, 
            page=page,
            language=region_config["language"],
            region=region_config["region"]
        )
        return {"results": results, "region": region_config}
    except Exception as exc:
        print(f"Search error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/movie/{movie_id}")
async def get_movie(movie_id: int) -> Dict[str, Any]:
    try:
        details = await _tmdb.movie_details(movie_id)
        return details
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/trending")
async def trending() -> Dict[str, Any]:
    try:
        results = await _tmdb.trending()
        return {"results": results}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/top_rated")
async def top_rated() -> Dict[str, Any]:
    try:
        results = await _tmdb.top_rated()
        return {"results": results}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/recommendations/{movie_id}")
async def recommendations(movie_id: int, limit: int = 20) -> Dict[str, Any]:
    try:
        # Seed: movie details
        seed = await _tmdb.movie_details(movie_id)
        seed_embedding: List[float] = []
        if _embedder:
            try:
                seed_embedding = await get_movie_embedding(seed)
            except Exception as embed_exc:
                print(f"[WARN] seed embedding failed: {embed_exc}")

        # Candidate pool: similar from TMDB + top rated backup
        candidates = await _tmdb.similar(movie_id)
        if not candidates:
            candidates = await _tmdb.top_rated()

        scored: List[Dict[str, Any]] = []
        for cand in candidates:
            try:
                emb: List[float] = []
                score = 0.0
                if _embedder:
                    emb = await get_movie_embedding(cand)
                    score = cosine_similarity(seed_embedding, emb) if seed_embedding else 0.0
                    brief = _movie_brief_cache.get(cand["id"])
                else:
                    brief = {
                        "id": cand.get("id"),
                        "title": cand.get("title") or cand.get("name"),
                        "overview": cand.get("overview"),
                        "poster_path": cand.get("poster_path"),
                        "backdrop_path": cand.get("backdrop_path"),
                        "vote_average": cand.get("vote_average"),
                        "release_date": cand.get("release_date"),
                    }
                scored.append({"movie": brief, "score": score})
            except Exception as embed_err:
                print(f"[WARN] recommendation embed failed: {embed_err}")
                continue

        if _embedder:
            scored.sort(key=lambda x: x["score"], reverse=True)
        return {"results": [s["movie"] for s in scored[:limit]]}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/query_recommendations")
async def query_recommendations(q: str = Query(..., min_length=1), limit: int = 20, region: str = "hollywood") -> Dict[str, Any]:
    try:
        region_config = MOVIE_REGIONS.get(region, MOVIE_REGIONS["hollywood"])
        
        # Get candidates from TMDB search with region filter
        candidates = await _tmdb.search(
            q,
            language=region_config["language"],
            region=region_config["region"]
        )
        if not candidates:
            return {"results": [], "region": region_config}
        
        # If no embedder, just return candidates
        if not _embedder:
            return {"results": candidates[:limit], "region": region_config}

        try:
            query_embedding = await _embedder.embed_text(q)
        except Exception as embed_exc:
            print(f"[WARN] query embedding failed: {embed_exc}")
            return {"results": candidates[:limit], "region": region_config}

        scored: List[Dict[str, Any]] = []
        for cand in candidates:
            try:
                emb = await get_movie_embedding(cand)
                score = cosine_similarity(query_embedding, emb)
                scored.append({"movie": _movie_brief_cache[cand["id"]], "score": score})
            except Exception as per_cand_err:
                print(f"[WARN] query embed per movie failed: {per_cand_err}")
                continue

        scored.sort(key=lambda x: x["score"], reverse=True)
        return {"results": [s["movie"] for s in scored[:limit]], "region": region_config}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.get("/api/personalized/{user_id}")
async def personalized_recommendations(user_id: int, limit: int = 20, region: str = "hollywood") -> Dict[str, Any]:
    try:
        # Get user preferences
        users = load_users()
        user = next((u for u in users if u["id"] == user_id), None)
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        user_genres = user["preferences"].get("genres", [])
        user_regions = user["preferences"].get("regions", ["hollywood"])
        
        # Use user's preferred region or fallback to requested region
        preferred_region = user_regions[0] if user_regions else region
        region_config = MOVIE_REGIONS.get(preferred_region, MOVIE_REGIONS["hollywood"])
        
        if not user_genres:
            # If no preferences, return top rated for the region
            results = await _tmdb.top_rated(
                language=region_config["language"],
                region=region_config["region"]
            )
            return {"results": results[:limit], "region": region_config}
        
        # Get movies from user's preferred genres in their preferred region
        all_movies = []
        for genre_id in user_genres:
            try:
                genre_movies = await _tmdb.discover_by_genre(
                    genre_id,
                    language=region_config["language"],
                    region=region_config["region"]
                )
                all_movies.extend(genre_movies)
            except Exception:
                continue
        
        # Remove duplicates and sort by rating
        unique_movies = {}
        for movie in all_movies:
            if movie["id"] not in unique_movies:
                unique_movies[movie["id"]] = movie
        
        # Sort by rating and genre match
        sorted_movies = sorted(
            unique_movies.values(),
            key=lambda m: (
                len(set(m.get("genre_ids", [])) & set(user_genres)),
                m.get("vote_average", 0)
            ),
            reverse=True
        )
        
        return {"results": sorted_movies[:limit], "region": region_config}
        
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
