from fastapi import APIRouter, HTTPException, status

from ml import ml_ops
from schemas import InferenceResponseSchema, InferenceSchema

router = APIRouter()


@router.post(
    "/inference",
    summary="Inference endpoint",
    description="Inference endpoint",
    status_code=status.HTTP_200_OK,
    response_description="Inference successful",
    response_model=InferenceResponseSchema,
)
async def inference(inference_schema: InferenceSchema):
    try:
        data = ml_ops.preprocess(
            inference_schema.distance, inference_schema.covered, inference_schema.length, inference_schema.width
        )
        prediction = ml_ops.predict(data)
        return InferenceResponseSchema(prediction=prediction)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
