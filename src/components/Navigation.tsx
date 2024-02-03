import css from "../styles/Navigation.module.css";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";

const Navigation = () => {
  const location = useLocation();
  const isHome = location.pathname === "/todo-app/";

  return (
    <header className={css.header}>
      <nav className={clsx("container", css.nav)}>
        <NavLink to="/todo-app/" className={css.brand} reloadDocument={isHome}>
          to do
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
