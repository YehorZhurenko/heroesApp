import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHeroes = createAsyncThunk('hero/fetchHero', async (params) => {
  const page = params.page || 1;
  const heroUrl = `http://localhost:3000/heroes/?page=${page}`;
  const res = await fetch(heroUrl).then((res) => res.json());

  return res;
});

export const fetchHero = createAsyncThunk('hero/fetchHero', async (params) => {
  const heroId = params.id;
  const heroUrl = `http://localhost:3000/heroes/${heroId}`;
  const res = await fetch(heroUrl).then((res) => res.json());

  return res;
});

export const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    value: 0,
    heroes: [],
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
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.heroes = [];
      });
  },
});

export const { increment, decrement, incrementByAmount } = heroSlice.actions;

export default heroSlice.reducer;
