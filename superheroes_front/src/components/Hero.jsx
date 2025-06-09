import { useDispatch } from 'react-redux';
import { deleteHero } from '../redux/slices/heroSlice';
import { useNavigate, Link } from 'react-router-dom';

import defaultHeroImg from '../assets/default-hero.png';
import styles from '../styles/modules/Hero.module.css';

const Hero = ({ id, name, avatarUrl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.heroContainer}>
      <img src={avatarUrl || defaultHeroImg} alt={name} className={styles.avatar} />

      <div className={styles.info}>
        <Link to={`/heroes/${id}`} className={styles.nameLink}>
          <h1 className={styles.name}>{name}</h1>
        </Link>
        <div className={styles.buttons}>
          <button className={styles.editButton} onClick={() => navigate(`/edit/${id}`)}>
            Edit
          </button>
          <button className={styles.deleteButton} onClick={() => dispatch(deleteHero({ id }))}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
