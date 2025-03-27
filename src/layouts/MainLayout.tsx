import { Link, Outlet } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <h1 className="layout__title">
          <Link to="/">Список стран</Link>
        </h1>
        <nav className="layout__nav">
          <Link to="/">Главная</Link>
          <Link to="/favorites">Избранное</Link>
        </nav>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">© 2025, Все права защищены</footer>
    </div>
  );
};

export default MainLayout;