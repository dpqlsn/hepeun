from fastapi import APIRouter

router = APIRouter()

@router.get("/facilities")
def get_facilities():
    return [
        {
            "id": 1,
            "name": "시설A",
            "address": "서울특별시 종로구 종로 1길 1",
            "phone": "02-123-4567",
            "operation_type": "공공운영",
            "service_details": "장애인 직업 재활 및 상담 서비스 제공"
        },
        {
            "id": 2,
            "name": "시설B",
            "address": "서울특별시 중구 세종대로 110",
            "phone": "02-765-4321",
            "operation_type": "민간운영",
            "service_details": "장애인 생활 지원 및 복지 서비스 제공"
        }
    ]