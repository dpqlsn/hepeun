import { useEffect, useState } from "react";
import axios from "axios";
import type { Facility } from "../types/type";
interface RawFacility {
    시설명: string;
    소재지도로명주소?: string;
    소재지지번주소?: string;
    전화번호?: string;
    운영형태?: string;
    장애인편의시설정보?: string;
}

export default function useFacilities() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFacilities = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(
            "https://api.odcloud.kr/api/15001020/v1/uddi:73a09ce6-7c10-4174-8be1-6cf139e3361e",
            {
                params: {
                page: 1,
                perPage: 30,
                serviceKey: import.meta.env.VITE_API_KEY,
                },
            }
            );

            const data = res.data.data as RawFacility[];

            const formatted: Facility[] = data
            .filter((item) =>
                item.소재지도로명주소?.includes("부산")
            )
            .map((item, idx: number) => ({
                id: `${item.시설명}-${idx}`,
                name: item.시설명,
                address: item.소재지도로명주소 || item.소재지지번주소 || "주소 없음",
                phone: item.전화번호 || "정보 없음",
                type: item.운영형태 || "정보 없음",
                service: item.장애인편의시설정보 || "정보 없음",
            }));

            setFacilities(formatted);
        } catch {
            setError("데이터를 불러오는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
        };

        fetchFacilities();
    }, []);

    return { facilities, loading, error };
}