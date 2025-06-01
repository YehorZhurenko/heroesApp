import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchHeroes } from '../redux/slices/heroSlice';

const HomePage = () => {
  const { heroes } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('heroes rerender');

    dispatch(fetchHeroes({ page: 1 }));
  }, [dispatch]);

  return (
    <div style={{ height: '40vh' }}>
      {heroes.map((h) => (
        <div key={h._id}>
          <Link to={`/heroes/${h._id}`}>
            <h1>{h.name}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
