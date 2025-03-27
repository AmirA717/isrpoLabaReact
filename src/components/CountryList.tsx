import CountryCard from "./CountryCard";
import "../styles/CountryList.css";
interface Country {
  name: { common: string };
  flags: { png: string };
}

interface CountryListProps {
  countries: Country[];
}

const CountryList: React.FC<CountryListProps> = ({ countries }) => {
  return (
    <div className="country-list">
      {countries.length > 0 ? (
        countries.map((country) => <CountryCard key={country.name.common} country={country} />)
      ) : (
        <p className="country-list__empty">Страны не найдены</p>
      )}
    </div>
  );
};

export default CountryList;
