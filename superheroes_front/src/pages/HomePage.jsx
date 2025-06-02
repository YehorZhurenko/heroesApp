import Pagination from '../components/Pagination';
import Heroes from '../components/Heroes';
import { Link } from 'react-router-dom';
import styles from '../styles/modules/HomePage.module.css';

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
