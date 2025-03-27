import { useEffect, useState } from "react";
import CountryList from "../components/CountryList";
import "../styles/CountriesPage.css";

interface Country {
  name: { common: string };
  capital: string;
  region: string;
  population: number;
  flags: { png: string };
}

const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error(`Ошибка ${response.status}`);
        const data = await response.json();

        const formattedData: Country[] = data.map((c: any) => ({
          name: { common: c.name.common }, // Исправляем формат имени
          capital: c.capital ? c.capital[0] : "Нет данных",
          region: c.region,
          population: c.population,
          flags: { png: c.flags.png },
        }));

        setCountries(formattedData);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    };

    fetchCountries();
  }, []);

  // Фильтрация стран по названию и региону
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="country-app">
      <h2 className="country-app__title">Список стран</h2>
      <div className="country-app__controls">
        <input
          type="text"
          className="country-app__search"
          placeholder="Поиск страны..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="country-app__filter"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Все регионы</option>
          <option value="Africa">Африка</option>
          <option value="Americas">Америка</option>
          <option value="Asia">Азия</option>
          <option value="Europe">Европа</option>
          <option value="Oceania">Океания</option>
        </select>
      </div>
      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default CountriesPage;
