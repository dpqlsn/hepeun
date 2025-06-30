import os
from typing import List
import urllib.parse
import xml.etree.ElementTree as ET
import httpx
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
router = APIRouter()

# Pydantic 모델 (Facility 정의)
class Facility(BaseModel):
    id: str
    name: str
    address: str
    phone: str
    type: str
    service: str

@router.get("/facilities", response_model=List[Facility])
async def get_facilities():
    encoded_key = os.getenv("VITE_API_KEY")
    if not encoded_key:
        raise HTTPException(status_code=500, detail="API 키가 설정되어 있지 않습니다.")

    service_key = encoded_key  # 인코딩된 상태로 그대로 사용

    url = "https://data.humetro.busan.kr/voc/api/open_api_convenience.tnn"
    params = {
        "serviceKey": service_key
    }

    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params, headers={"Accept": "application/xml"})
        if res.status_code != 200:
            raise HTTPException(status_code=res.status_code, detail=f"API 호출 실패: {res.text}")

        try:
            root = ET.fromstring(res.text)
        except ET.ParseError as e:
            raise HTTPException(status_code=500, detail=f"XML 파싱 오류: {str(e)}")

        facilities = []
        for item in root.findall(".//item"):  # XML 구조에 따라 조정 필요
            name = item.findtext("시설명") or "이름없음"
            address = item.findtext("소재지도로명주소") or item.findtext("소재지지번주소") or "주소 없음"
            phone = item.findtext("전화번호") or "정보 없음"
            ftype = item.findtext("운영형태") or "정보 없음"
            service = item.findtext("장애인편의시설정보") or "정보 없음"

            # 부산 지역 필터링 (필요시)
            if "부산" not in address:
                continue

            facilities.append(
                Facility(
                    id=f"{name}",
                    name=name,
                    address=address,
                    phone=phone,
                    type=ftype,
                    service=service
                )
            )

    return facilities

app.include_router(router)
