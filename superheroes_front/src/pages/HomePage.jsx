import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from '../redux/slices/heroSlice';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const heroes = useSelector((state) => state.hero.heroes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroes(2));
  }, [dispatch]);

  return (
    <Link to="">
      {heroes.map((h) => (
        <div key={h._id}>{h.name}</div>
      ))}
    </Link>
  );
};

export default HomePage;
