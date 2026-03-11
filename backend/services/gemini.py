from __future__ import annotations

import asyncio
from typing import List

import google.generativeai as genai


def cosine_similarity(a: List[float], b: List[float]) -> float:
    if not a or not b or len(a) != len(b):
        return 0.0
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = sum(x * x for x in a) ** 0.5
    norm_b = sum(y * y for y in b) ** 0.5
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


class GeminiEmbedder:
    def __init__(self, api_key: str) -> None:
        if not api_key:
            raise ValueError("AIzaSyA8as747HsPVXVgJFNmkOgpQkoVQeHDcq0")
        genai.configure(api_key=api_key)
        # Use the correct embedding model
        self.model = "models/embedding-001"

    async def embed_text(self, text: str) -> List[float]:
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self._embed_sync, text)

    def _embed_sync(self, text: str) -> List[float]:
        result = genai.embed_content(model=self.model, content=text)
        return result.get("embedding", [])
