import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run as uvicorn_run

from api import router
from constants import MODEL_PATH, SCALER_PATH
from deps import get_ml_deps
from ml import ml_ops
from settings import settings

from train import train


def _register_api_handlers(app: FastAPI) -> FastAPI:
    """Register API handlers."""
    app.include_router(router)
    return app


def add_middleware(app: FastAPI) -> FastAPI:
    """Add middleware to FastAPI application."""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Train model if it does not exist
    if not os.path.exists(SCALER_PATH) or not os.path.exists(MODEL_PATH):
        train()
    # Load model and scaler
    ml_ops.scaler, ml_ops.model = get_ml_deps()
    yield


def create_app() -> FastAPI:
    """Create and return FastAPI application."""
    app = FastAPI(version="1.0.0", title="Terenuri API", root_path="/api/v1", lifespan=lifespan)
    app = _register_api_handlers(app)
    app = add_middleware(app)
    return app


if __name__ == "__main__":
    app: FastAPI = create_app()
    uvicorn_run(app, host=settings.app_host, port=int(settings.app_port))
