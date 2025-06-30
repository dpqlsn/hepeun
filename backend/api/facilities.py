from fastapi import APIRouter

router = APIRouter()

@router.get("/facilities")
def get_facilities():
    return [
        {
            "id": 1,
            "name": "강서구 장애인복지관",
            "address": "부산광역시 강서구 대저로 324번길 17",
            "phone": "051-971-4510",
        },
        {
            "id": 2,
            "name": "부산광역시 강서구장애인복지관",
            "address": "부산광역시 강서구 명지국제8로 263",
            "phone": " 051-972-2040",
        }
    ]