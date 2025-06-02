import { useDispatch } from 'react-redux';
import { deleteHero } from '../redux/slices/heroSlice';
import { useNavigate, Link } from 'react-router-dom';

import defaultHeroImg from '../assets/default-hero.png';

const Hero = ({ id, name, avatarUrl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(avatarUrl);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
      <img
        src={avatarUrl || defaultHeroImg}
        alt={name}
        style={{
          width: '60px',
          height: '60px',
          objectFit: 'cover',
          borderRadius: '50%',
          marginRight: '1rem',
        }}
      />

      {/* Hero Info & Buttons */}
      <div>
        <Link to={`/heroes/${id}`}>
          <h1 style={{ margin: 0 }}>{name}</h1>
        </Link>
        <button onClick={() => navigate(`/edit/${id}`)}>edit</button>
        <button
          onClick={async () => {
            dispatch(deleteHero({ id }));
            // navigate('/heroes');
          }}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Hero;
