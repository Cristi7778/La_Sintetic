from pydantic import BaseModel, Field


class InferenceSchema(BaseModel):
    name: str = Field(..., example="Micii Fotbalisti")
    distance: float = Field(..., example=6.9)
    covered: bool = Field(..., example=False)
    length: int = Field(..., example=42)
    width: int = Field(..., example=21)


class InferenceResponseSchema(BaseModel):
    prediction: float = Field(..., example=120)
