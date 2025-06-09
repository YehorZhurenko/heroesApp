import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchHero } from '../redux/slices/heroSlice';
import CustomSlider from '../components/custom.slider';
import styles from '../styles/modules/DetailsPage.module.css';

const DetailsPage = () => {
  const dispatch = useDispatch();
  const { heroDetails: hero, status } = useSelector((state) => state.hero);
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const segms = location.pathname.split('/').slice(1, -1);

  useEffect(() => {
    console.log('DetailsPage');

    dispatch(fetchHero(id));
  }, [dispatch, id]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === 'resolved' && hero) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          {segms.map((s) => `${s} > `)}
          {hero.name}
        </h1>

        <h2 className={styles.realName}>Real Name: {hero.real_name}</h2>

        <p className={styles.origin}>
          <strong>Origin:</strong> {hero.origin_description}
        </p>

        <div className={styles.superpowers}>
          <h3>Superpowers</h3>
          <ul>
            {hero.superpowers.map((power, index) => (
              <li key={index}>{power}</li>
            ))}
          </ul>
        </div>

        <p className={styles.catchPhrase}>
          <strong>Catch Phrase:</strong> <em>{hero.catch_phrase}</em>
        </p>

        <div className={styles.imagesSection}>
          <CustomSlider>
            {hero.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Hero image ${index + 1}`}
                className={styles.image}
              />
            ))}
          </CustomSlider>
        </div>

        <div className={styles.buttons}>
          <button onClick={handleBack}>Back</button>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        </div>
      </div>
    );
  }

  return null;
};

export default DetailsPage;
