import { useEffect, useState } from "react";
import axios from "axios";
import type { Facility } from "../types/type";

export default function useFacilities() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        axios
        .get<Facility[]>("http://localhost:8000/facilities")
        .then((res) => setFacilities(res.data))
        .catch(() => setError("데이터를 불러오는 중 오류가 발생했습니다."))
        .finally(() => setLoading(false));
    }, []);

    return { facilities, loading, error };
}