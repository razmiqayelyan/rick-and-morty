import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/characters">Characters</NavLink>
    <NavLink to="/locations">Locations</NavLink>
    <NavLink to="/episodes">Episodes</NavLink>
  </nav>
);

export default Navbar;
