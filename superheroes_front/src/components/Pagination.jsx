import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from '../redux/slices/heroSlice';

const Pagination = () => {
  console.log('Pagination rendered');
  const buttons = [];

  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.hero.totalPages);

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(i);
  }

  return (
    <div>
      {buttons.map((i) => (
        <button
          key={i}
          onClick={() => {
            console.log(`page: ${i}`);
            dispatch(fetchHeroes({ page: i }));
          }}>
          {i}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
