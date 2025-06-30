import os
import requests
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.get("/external/facilities")
def get_external_facilities(page: int = 1, size: int = 100):
    SERVICE_KEY = os.getenv("DATA_SERVICE_KEY")
    if not SERVICE_KEY:
        raise HTTPException(status_code=500, detail="서비스 키가 설정되지 않았습니다.")

    url = "https://data.humetro.busan.kr/voc/api/open_api_convenience.tnn"

    params = {
        "serviceKey": SERVICE_KEY,
        "pageNo": page,
        "numOfRows": size,
        "_type": "json",
    }

    try:
        resp = requests.get(url, params=params)
        resp.raise_for_status()
        data = resp.json()

        items = data.get("response", {}).get("body", {}).get("items", [])

        return items

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"외부 API 호출 오류: {str(e)}")
