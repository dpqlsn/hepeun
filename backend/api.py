from fastapi import APIRouter

router = APIRouter()

@router.get("/facilities")
def get_facilities():
    return [
        {"id": 1, "name": "시설A", "address": "서울", "phone": "010-0000-0000", "type": "체육", "service": "대여"},
        {"id": 2, "name": "시설B", "address": "부산", "phone": "010-1111-1111", "type": "문화", "service": "이용"},
    ]
