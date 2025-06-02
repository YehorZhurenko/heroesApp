import Pagination from '../components/Pagination';
import Heroes from '../components/Heroes';

import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Link to="/create">Add new hero</Link>
      <Heroes />
      <Pagination />
    </div>
  );
};

export default HomePage;
