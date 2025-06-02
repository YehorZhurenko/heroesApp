import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHeroes } from '../redux/slices/heroSlice';
import Hero from './Hero';

const Heroes = () => {
  const { heroes } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes({ page: 1 }));
  }, [dispatch]);

  return (
    <div style={{ height: '60vh' }}>
      {heroes.map((h) => (
        <Hero key={h._id} id={h._id} name={h.name} avatarUrl={h.images[0]} />
      ))}
    </div>
  );
};

export default Heroes;
