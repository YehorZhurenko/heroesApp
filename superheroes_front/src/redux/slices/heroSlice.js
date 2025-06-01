import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHeroes = createAsyncThunk('hero/fetchHeroes', async (params, thunkAPI) => {
  const page = params.page || 1;
  const state = thunkAPI.getState();

  console.log('state');
  console.log(state);

  const heroUrl = `http://localhost:3000/heroes/?page=${page}`;
  const res = await fetch(heroUrl).then((res) => res.json());

  return res;
});

export const fetchHero = createAsyncThunk('hero/fetchHero', async (heroId) => {
  const heroUrl = `http://localhost:3000/heroes/${heroId}`;
  const res = await fetch(heroUrl).then((res) => res.json());

  return res;
});

export const createHero = createAsyncThunk('hero/createHero', async (props) => {
  console.log(props);

  axios
    .post('http://localhost:3000/heroes/new', props)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

export const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    value: 0,
    heroes: [],
    heroDetails: {},
    totalPages: null,
    status: null,
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state, action) => {
        state.heroes = [];
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        console.log(action.payload);

        state.heroes = action.payload.heroes;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.heroes = [];
      })
      .addCase(fetchHero.pending, (state, action) => {
        state.heroDetails = null;
        state.status = 'loading';
      })
      .addCase(fetchHero.fulfilled, (state, action) => {
        state.heroDetails = action.payload;
        state.status = 'resolved';
      })
      .addCase(fetchHero.rejected, (state, action) => {
        state.heroDetails = null;
        state.status = 'rejected';
      });
  },
});

export const { increment, decrement, incrementByAmount } = heroSlice.actions;

export default heroSlice.reducer;
