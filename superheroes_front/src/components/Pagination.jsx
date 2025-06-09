import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from '../redux/slices/heroSlice';
import styles from '../styles/modules/Pagination.module.css';

const Pagination = () => {
  const buttons = [];

  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.hero.totalPages);

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(i);
  }

  return (
    <div className={styles.container}>
      {buttons.map((i) => (
        <button
          key={i}
          className={styles.pageButton}
          onClick={() => {
            dispatch(fetchHeroes({ page: i }));
          }}>
          {i}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
