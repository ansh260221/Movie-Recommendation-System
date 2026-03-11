import os
from typing import Any, Dict, List

import aiohttp

TMDB_BASE = "https://api.themoviedb.org/3"


class TMDBClient:
    def __init__(self, api_key: str) -> None:
        self.api_key = api_key
        if not self.api_key:
            raise ValueError("TMDB_API_KEY is required")

    async def _get(self, path: str, params: Dict[str, Any] | None = None) -> Dict[str, Any]:
        params = params or {}
        params["api_key"] = self.api_key
        url = f"{TMDB_BASE}{path}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as resp:
                resp.raise_for_status()
                return await resp.json()

    async def search(self, query: str, page: int = 1, language: str = "en", region: str = "US") -> List[Dict[str, Any]]:
        try:
            params = {
                "query": query, 
                "page": page, 
                "include_adult": "false",
                "language": language,
                "region": region
            }
            data = await self._get("/search/movie", params)
            print(f"TMDB search response: {data}")
            return data.get("results", [])
        except Exception as e:
            print(f"TMDB search error: {e}")
            raise

    async def movie_details(self, movie_id: int, language: str = "en") -> Dict[str, Any]:
        return await self._get(f"/movie/{movie_id}", {"language": language})

    async def trending(self, media_type: str = "movie", time_window: str = "week", language: str = "en", region: str = "US") -> List[Dict[str, Any]]:
        params = {"language": language, "region": region}
        data = await self._get(f"/trending/{media_type}/{time_window}", params)
        return data.get("results", [])

    async def top_rated(self, language: str = "en", region: str = "US") -> List[Dict[str, Any]]:
        params = {"language": language, "region": region}
        data = await self._get("/movie/top_rated", params)
        return data.get("results", [])

    async def popular(self, language: str = "en", region: str = "US") -> List[Dict[str, Any]]:
        params = {"language": language, "region": region}
        data = await self._get("/movie/popular", params)
        return data.get("results", [])

    async def similar(self, movie_id: int, language: str = "en") -> List[Dict[str, Any]]:
        params = {"language": language}
        data = await self._get(f"/movie/{movie_id}/similar", params)
        return data.get("results", [])

    async def discover_by_genre(self, genre_id: int, language: str = "en", region: str = "US") -> List[Dict[str, Any]]:
        params = {
            "with_genres": genre_id,
            "language": language,
            "region": region,
            "sort_by": "popularity.desc",
            "include_adult": "false"
        }
        data = await self._get("/discover/movie", params)
        return data.get("results", [])
