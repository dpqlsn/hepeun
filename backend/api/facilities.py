from fastapi import APIRouter

router = APIRouter()

@router.get("/facilities")
def get_facilities():
    return [
        {"id": 1, "name": "시설A", "address": "서울", "phone": "010-0000-0000", "type": "체육", "service": "대여"},
    ]
