import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.scss';

type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

function getNavLinkClassName({ isActive }: NavLinkRenderProps) {
  return isActive ? styles.navLinkActive : styles.navLink;
}

export default function Navbar() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={getNavLinkClassName}>
        Главная
      </NavLink>

      <NavLink to="/products" className={getNavLinkClassName}>
        Товары
      </NavLink>

      <NavLink to="/page2" className={getNavLinkClassName}>
        Page 2
      </NavLink>

      <NavLink to="/page3" className={getNavLinkClassName}>
        Page 3
      </NavLink>
    </header>
  );
}
