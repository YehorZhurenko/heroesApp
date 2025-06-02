import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHeroes = createAsyncThunk('hero/fetchHeroes', async (params) => {
  const page = params.page || 1;

  const heroUrl = `http://localhost:3000/heroes/?page=${page}`;
  const res = await fetch(heroUrl).then((res) => res.json());

  return res;
});

export const fetchHero = createAsyncThunk('hero/fetchHero', async (heroId, { rejectWithValue }) => {
  const heroUrl = `http://localhost:3000/heroes/${heroId}`;

  try {
    const response = await fetch(heroUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const createHero = createAsyncThunk(
  'hero/createHero',
  async (props, { rejectWithValue }) => {
    console.log(props);

    axios
      .post('http://localhost:3000/heroes/new', props)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => rejectWithValue(err));
  },
);

export const updateHero = createAsyncThunk(
  'hero/updateHero',
  async ({ id, updatedHero }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/heroes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHero),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Hero updated:', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteHero = createAsyncThunk(
  'hero/deleteHero',
  async ({ id }, { rejectWithValue }) => {
    console.log(`deleting hero #${id}`);

    try {
      const response = await fetch(`http://localhost:3000/heroes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Hero deleted:', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    value: 0,
    heroes: [],
    heroDetails: null,
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
      .addCase(fetchHeroes.pending, (state) => {
        state.heroes = [];
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
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
        state.error = action.payload;
      })
      .addCase(createHero.fulfilled, (state, action) => {
        state.heroDetails = action.payload;
        state.status = 'resolved';
      })
      .addCase(createHero.rejected, (state, action) => {
        state.heroDetails = null;
        state.status = 'rejected';
        state.error = action.payload;
      })

      .addCase(deleteHero.fulfilled, (state, action) => {
        console.log(action.payload._id);
        state.heroes = state.heroes.filter((f) => f._id !== action.payload._id);
        state.status = 'resolved';
        state.error = null;
      });
  },
});

export const { increment, decrement, incrementByAmount } = heroSlice.actions;

export default heroSlice.reducer;
