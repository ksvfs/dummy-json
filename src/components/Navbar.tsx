import { useState, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';

import icons from '../assets/icons';

export default function Navbar() {
  const [themeIcon, setThemeIcon] = useState<JSX.Element>();

  useLayoutEffect(setTheme, []);

  function setTheme() {
    const localTheme = localStorage.getItem('theme');

    if (localTheme === 'dark') {
      document.body.classList.add('dark');
      setThemeIcon(icons.sun);
    } else {
      document.body.classList.add('light');
      setThemeIcon(icons.moon);
    }
  }

  function switchTheme() {
    if (document.body.classList.contains('light')) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setThemeIcon(icons.sun);
    } else if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
      setThemeIcon(icons.moon);
    }
  }

  return (
    <header>
      <nav>
        <NavLink to="/products">Товары</NavLink>
      </nav>

      <button onClick={switchTheme}>{themeIcon}</button>
    </header>
  );
}
