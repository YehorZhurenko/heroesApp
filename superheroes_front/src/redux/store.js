import { configureStore } from '@reduxjs/toolkit';
import heroReducer from './slices/heroSlice';

export default configureStore({
  reducer: {
    hero: heroReducer,
  },
});
