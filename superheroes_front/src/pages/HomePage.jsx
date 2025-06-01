import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';

import { fetchHeroes } from '../redux/slices/heroSlice';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const { heroes, status, error, totalDocs } = useSelector((state) => state.hero);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'));
  console.log(`page: ${page}`);

  useEffect(() => {
    dispatch(fetchHeroes({ page: 1 }));

    console.log(page);
  }, [dispatch]);

  return (
    <div>
      <Link to="/create">Add new hero</Link>
      {heroes.map((h) => (
        <div key={h._id}>
          <Link to={`/heroes/${h._id}`}>
            <h1>{h.name}</h1>
          </Link>
        </div>
      ))}

      <Pagination />
    </div>
  );
};

export default HomePage;
