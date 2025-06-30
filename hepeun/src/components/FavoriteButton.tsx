import { useFavoriteStore } from "../store/favoriteStore";
import type { Props } from "../types/type";

export default function FavoriteButton({ facility }: Props) {
    const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
    const isFavorite = useFavoriteStore((state) =>
        state.isFavorite(facility.id)
    );

    return (
        <button onClick={() => toggleFavorite(facility)}>
        {isFavorite ? "★ 즐겨찾기" : "☆ 즐겨찾기"}
        </button>
    );
}