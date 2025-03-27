import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import "../styles/CountryCard.css";

interface Country {
  name: { common: string };
  flags: { png: string };
}

interface CountryCardProps {
  country: Country;
  onRemove?: (name: string) => void; // Пропс для удаления из избранного
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onRemove }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.name === country.name.common);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(country.name.common);
      if (onRemove) onRemove(country.name.common); // Удаляем страну из списка
    } else {
      addToFavorites({ name: country.name.common, flag: country.flags.png });
    }
  };

  return (
    <div className="country-card">
      <Link to={`/countryDetailPage/${encodeURIComponent(country.name.common)}`} className="country-card__link">
        <img src={country.flags.png} alt={country.name.common} className="country-card__flag" />
        <p className="country-card__name">{country.name.common}</p>
      </Link>
      <button 
        className={`country-card__fav-btn ${isFavorite ? "remove" : "add"}`} 
        onClick={handleFavoriteClick}
      >
        {isFavorite ? "Удалить" : "Добавить"}
      </button>
    </div>
  );
};

export default CountryCard;
