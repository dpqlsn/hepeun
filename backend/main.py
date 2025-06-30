import os
import httpx
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import xml.etree.ElementTree as ET

app = FastAPI() 

@app.get("/facilities")
async def get_facilities():
    service_key = os.getenv("VITE_API_KEY")
    if not service_key:
        raise HTTPException(status_code=500, detail="API 키가 설정되어 있지 않습니다.")

    url = "https://data.humetro.busan.kr/voc/api/open_api_convenience.tnn"

    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(url, params={"serviceKey": service_key}, headers={"Accept": "application/xml"})
            res.raise_for_status()

            root = ET.fromstring(res.text)
            facilities = []
            for item in root.findall(".//item"):
                facilities.append({
                    "name": item.findtext("시설명"),
                    "address": item.findtext("소재지도로명주소") or item.findtext("소재지지번주소"),
                    "phone": item.findtext("전화번호"),
                    "type": item.findtext("운영형태"),
                    "service": item.findtext("장애인편의시설정보"),
                })

            return facilities

    except httpx.HTTPStatusError as e:
        print(f"API 호출 실패: {e.response.status_code}, 내용: {e.response.text}")
        raise HTTPException(status_code=e.response.status_code, detail=e.response.text)
    except ET.ParseError as e:
        raise HTTPException(status_code=500, detail=f"XML 파싱 오류: {str(e)}")
