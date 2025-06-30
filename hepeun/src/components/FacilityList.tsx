import FavoriteButton from "./FavoriteButton";
import type { facilities } from "../types/type";


export default function FacilityList({ facilities, onSelect }: facilities) {
    return (
        <div>
        {facilities.map((f) => (
            <div
            key={f.id}
            style={{
                border: "1px solid #ccc",
                marginBottom: 8,
                padding: 10,
                cursor: "pointer",
            }}
            onClick={() => onSelect(f)}
            >
            <h3>{f.name}</h3>
            <p>{f.address}</p>
            <FavoriteButton facility={f} />
            </div>
        ))}
        </div>
    );
}