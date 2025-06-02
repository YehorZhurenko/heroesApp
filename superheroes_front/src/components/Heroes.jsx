import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';

import { fetchHeroes, deleteHero } from '../redux/slices/heroSlice';
import Hero from './Hero';

const HomePage = () => {
  const { heroes } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHeroes({ page: 1 }));
  }, [dispatch]);

  return (
    <div style={{ height: '60vh' }}>
      {heroes.map((h) => (
        <Hero key={h._id} id={h._id} name={h.name} />
      ))}
    </div>
  );
};

export default HomePage;
