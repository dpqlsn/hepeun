import axios from "axios";
import { useEffect, useState } from "react";

interface Facility {
    id: string; 
    name: string;
}

export default function ExternalFacilities() {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8000/external/facilities")
        .then(res => {
            console.log(res.data);
            setFacilities(res.data);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>로딩중...</div>;

    return (
        <ul>
        {facilities.map(f => (
            <li key={f.id}>{f.name}</li>
        ))}
        </ul>
    );
}
