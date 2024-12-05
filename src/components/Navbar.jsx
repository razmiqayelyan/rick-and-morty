import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <NavLink to="/" className="nav-link">Home</NavLink>
    <NavLink to="/characters" className="nav-link">Characters</NavLink>
    <NavLink to="/locations" className="nav-link">Locations</NavLink>
    <NavLink to="/episodes" className="nav-link">Episodes</NavLink>
  </nav>
);

export default Navbar;
