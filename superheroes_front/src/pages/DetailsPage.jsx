import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchHero } from '../redux/slices/heroSlice';

const DetailsPage = ({ name }) => {
  const dispatch = useDispatch();
  const { heroDetails: hero, status } = useSelector((state) => state.hero);
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const segms = location.pathname.split('/').slice(1, -1);

  useEffect(() => {
    dispatch(fetchHero(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'resolved')
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>
          {segms.map((s) => `${s} > `)}

          {hero.name}
        </h1>
        <h2>Real Name: {hero.real_name}</h2>
        <p>
          <strong>Origin:</strong> {hero.origin_description}
        </p>

        <h3>Superpowers</h3>
        <ul>
          {hero.superpowers.map((power, index) => (
            <li key={index}>{power}</li>
          ))}
        </ul>

        <p>
          <strong>Catch Phrase:</strong> <em>{hero.catch_phrase}</em>
        </p>

        <h3>Images</h3>
        <button onClick={() => navigate(-1)}>back</button>
      </div>
    );
};

export default DetailsPage;
