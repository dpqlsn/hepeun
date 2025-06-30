from fastapi import APIRouter

router = APIRouter()

@router.get("/facilities")
def get_facilities():
    return [{"id": 1, "name": "시설A"}, {"id": 2, "name": "시설B"}]