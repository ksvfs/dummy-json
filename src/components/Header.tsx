import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/page1">Page 1</NavLink>
      <NavLink to="/page2">Page 2</NavLink>
      <NavLink to="/page3">Page 3</NavLink>
    </header>
  );
}
