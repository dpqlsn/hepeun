from pydantic import BaseModel

class Facility(BaseModel):
    id: str
    name: str
    address: str
    phone: str
    type: str
    service: str