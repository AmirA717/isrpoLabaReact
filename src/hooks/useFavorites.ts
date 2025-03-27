import { useState, useEffect } from "react";

interface Country {
  name: string;
  flag: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Country[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (country: Country) => {
    if (!favorites.some((fav) => fav.name === country.name)) {
      const updatedFavorites = [...favorites, country];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (name: string) => {
    const updatedFavorites = favorites.filter((country) => country.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return { favorites, addToFavorites, removeFromFavorites };
};
