import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/CountryDetailPage.css";

interface Country {
  name: { common: string };
  flags: { png: string };
  capital?: string[];
  region: string;
  population: number;
  languages: Record<string, string>;
}

const CountryDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        if (!response.ok) throw new Error("Ошибка при загрузке данных");
        const data = await response.json();
        setCountry(data[0]); 
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    if (name) {
      fetchCountryDetails();
    }
  }, [name]);

  if (!country) return <p>Загрузка...</p>;

  return (
    <div className="country-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        Назад
      </button>
      <h2 className="country-detail__title">
        {country.name.common}
      </h2>
      <img
        className="country-detail__flag"
        src={country.flags.png}
        alt={`Флаг ${country.name.common}`}
      />
      <p className="country-detail__info"><strong>Столица:</strong> {country.capital?.[0] || "Нет данных"}</p>
      <p className="country-detail__info"><strong>Регион:</strong> {country.region}</p>
      <p className="country-detail__info"><strong>Население:</strong> {country.population.toLocaleString()}</p>
      <p className="country-detail__info"><strong>Языки:</strong> {Object.values(country.languages).join(", ")}</p>
    </div>
  );
};

export default CountryDetailPage;
