import Pagination from '../components/Pagination';
import Heroes from '../components/Heroes';
import { Link } from 'react-router-dom';
import styles from '../styles/modules/HomePage.module.css';
import { useDispatch } from 'react-redux';
import { fetchHeroes } from '../redux/slices/heroSlice';
import { useEffect } from 'react';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Link to="/create" className={styles.addLink}>
        Add new hero
      </Link>
      <Heroes />
      <Pagination />
    </div>
  );
};

export default HomePage;
