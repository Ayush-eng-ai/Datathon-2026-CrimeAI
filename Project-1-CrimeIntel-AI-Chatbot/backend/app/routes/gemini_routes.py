from fastapi import APIRouter

from app.services.gemini_service import generate_ai_response

router = APIRouter(
    prefix="/api/gemini",
    tags=["Gemini AI"],
)


@router.get("/test")
def test_gemini():

    prompt = """
    Say hello from CrimeIntel AI.
    """

    answer = generate_ai_response(prompt)

    return {
        "success": True,
        "response": answer,
    }