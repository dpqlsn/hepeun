import { create } from "zustand";
import type { Facility } from "../types/type";

interface FavoriteState {
    favorites: Facility[];
    toggleFavorite: (facility: Facility) => void;
    isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
    toggleFavorite: (facility) => {
        const favorites = get().favorites;
        const exists = favorites.find((f) => f.id === facility.id);
        const updated = exists
        ? favorites.filter((f) => f.id !== facility.id)
        : [...favorites, facility];
        localStorage.setItem("favorites", JSON.stringify(updated));
        set({ favorites: updated });
    },
    isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
    },
}));