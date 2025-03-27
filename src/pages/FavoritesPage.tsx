import { useFavorites } from "../hooks/useFavorites";
import CountryCard from "../components/CountryCard";
import { useState, useEffect } from "react";
import "../styles/FavoritesPage.css";

const FavoritesPage: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [favoriteCountries, setFavoriteCountries] = useState(favorites);

  useEffect(() => {
    setFavoriteCountries(favorites); // Обновляем список при изменении избранных стран
  }, [favorites]);

  const handleRemove = (name: string) => {
    removeFromFavorites(name);
    setFavoriteCountries((prev) => prev.filter((country) => country.name !== name)); // Фильтруем удалённую страну
  };

  return (
    <div className="favorites-page">
      <h2>Избранные страны</h2>
      {favoriteCountries.length > 0 ? (
        <div className="favorites-list">
          {favoriteCountries.map((country) => (
            <CountryCard 
              key={country.name}
              country={{ name: { common: country.name }, flags: { png: country.flag } }}
              onRemove={handleRemove} // Передаём обработчик удаления
            />
          ))}
        </div>
      ) : (
        <p className="favorites-list__empty">Нет избранных стран</p>
      )}
    </div>
  );
};

export default FavoritesPage;
