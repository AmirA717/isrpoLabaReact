import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import CountryListPage from "../pages/CountriesPage";
import FavoritesPage from "../pages/FavoritesPage";
import CountryDetailPage from "../pages/CountryDetailPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<CountryListPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/country/:name" element={<CountryDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
