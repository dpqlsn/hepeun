import os
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERVICE_KEY = os.getenv("SERVICE_KEY")


class Facility(BaseModel):
    id: str
    name: str
    address: str
    phone: str
    type: str
    service: str


@app.get("/")
async def root():
    return {"message": "Hepeun 백엔드 작동 중"}


@app.get("/facilities", response_model=List[Facility])
async def get_facilities():
    if not SERVICE_KEY:
        raise HTTPException(status_code=500, detail="API 키가 설정되어 있지 않습니다.")
    url = "https://api.odcloud.kr/api/15001020/v1/uddi:73a09ce6-7c10-4174-8be1-6cf139e3361e"
    params = {
        "page": 1,
        "perPage": 100,
        "serviceKey": SERVICE_KEY,
    }

    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params)
        if res.status_code != 200:
            raise HTTPException(status_code=500, detail="공공데이터 API 호출 실패")
        raw_data = res.json().get("data", [])

    facilities = []
    for idx, item in enumerate(raw_data):
        addr = item.get("소재지도로명주소") or item.get("소재지지번주소") or "주소 없음"
        if "부산" not in addr:
            continue
        facilities.append(
            Facility(
                id=f"{item.get('시설명', 'unknown')}-{idx}",
                name=item.get("시설명", "정보 없음"),
                address=addr,
                phone=item.get("전화번호", "정보 없음"),
                type=item.get("운영형태", "정보 없음"),
                service=item.get("장애인편의시설정보", "정보 없음"),
            )
        )
    return facilities