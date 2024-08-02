import { useState, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
    <Header>
      <nav>
        <StyledNavLink to="/products">Товары</StyledNavLink>
      </nav>

      <ColorThemeSwitch onClick={switchTheme}>{themeIcon}</ColorThemeSwitch>
    </Header>
  );
}

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  height: 3.5rem;
  padding-inline: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3em;
  background-color: var(--navbar-background-color);
  backdrop-filter: blur(5px);
`;

const StyledNavLink = styled(NavLink)`
  color: var(--main-foreground-color);
  text-decoration: none;

  &.active {
    font-weight: bold;
  }
`;

const ColorThemeSwitch = styled.button`
  & > svg {
    width: 1.3rem;
    height: 1.3rem;
    cursor: pointer;
  }
`;
