export interface Facility {
    id: string;
    name: string;
    address: string;
    phone: string;
    type: string;
    service: string;
}

export interface Props {
    facility: Facility;
}

export interface facilities {
    facilities: Facility[];
    onSelect: (facility: Facility) => void;
}

export interface ApiResponse {
    currentCount: number;
    data: FacilityRaw[];
    matchCount: number;
    page: number;
    perPage: number;
    totalCount: number;
}

export interface FacilityRaw {
    시설명: string;
    소재지도로명주소: string;
    소재지지번주소: string;
    전화번호: string;
    운영형태: string;
    장애인편의시설정보: string;
}