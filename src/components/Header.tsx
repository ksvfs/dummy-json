import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

type NavLinkRenderProps = {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
};

function getNavLinkClassName({ isActive }: NavLinkRenderProps) {
  return isActive ? styles.navLinkActive : styles.navLink;
}

export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={getNavLinkClassName}>
        Home
      </NavLink>

      <NavLink to="/page1" className={getNavLinkClassName}>
        Page 1
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
