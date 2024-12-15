// components/Navbar.jsx
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => (
  <nav className={styles.navbar}>
    <NavLink to="/" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Home</NavLink>
    <NavLink to="/characters" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Characters</NavLink>
    <NavLink to="/locations" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Locations</NavLink>
    <NavLink to="/episodes" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Episodes</NavLink>
  </nav>
);

export default Navbar;
