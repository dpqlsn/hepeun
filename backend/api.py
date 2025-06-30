import os
from typing import List
import httpx
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

from models import Facility

load_dotenv()
router = APIRouter()

@router.get("/facilities", response_model=List[Facility])
async def get_facilities():
    try:
        service_key = os.getenv("SERVICE_KEY")
        url = "https://api.odcloud.kr/api/15001020/v1/uddi:73a09ce6-7c10-4174-8be1-6cf139e3361e"
        params = {
            "page": 1,
            "perPage": 100,
            "serviceKey": service_key
        }

        async with httpx.AsyncClient() as client:
            res = await client.get(url, params=params)
            res.raise_for_status()
            raw_data = res.json()["data"]

        facilities = [
            Facility(
                id=f"{item['시설명']}-{idx}",
                name=item["시설명"],
                address=item.get("소재지도로명주소") or item.get("소재지지번주소") or "주소 없음",
                phone=item.get("전화번호", "정보 없음"),
                type=item.get("운영형태", "정보 없음"),
                service=item.get("장애인편의시설정보", "정보 없음")
            )
            for idx, item in enumerate(raw_data)
            if "부산" in item.get("소재지도로명주소", "")
        ]

        return facilities

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
