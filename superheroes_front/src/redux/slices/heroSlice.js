import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHeroes = createAsyncThunk('hero/fetchHeroes', async (params) => {
  const page = params.page || 1;

  const heroUrl = `http://localhost:3000/heroes/?page=${page}`;
  const res = await fetch(heroUrl).then((res) => res.json());

  return res;
});

export const fetchHero = createAsyncThunk(
  'hero/fetchHero',
  async (heroId, { rejectWithValue, dispatch }) => {
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
  },
);

export const createHero = createAsyncThunk(
  'hero/createHero',
  async (props, { rejectWithValue, dispatch }) => {
    const res = axios
      .post('http://localhost:3000/heroes/new', props)
      .then((res) => {
        dispatch(addHero(res.data));
        return res.data;
      })
      .catch((err) => rejectWithValue(err));

    console.log('createHero response: ');
    console.log(res);

    return res;
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
    addHero(state, action) {
      state.heroes.push(action.payload);
      state.heroDetails = action.payload;
      console.log(action.payload._id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroes = [];
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        console.log();

        state.heroes = action.payload.heroes;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.heroes = [];
      })
      .addCase(fetchHero.pending, (state, action) => {
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
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        state.heroDetails = action.payload;
        state.status = 'resolved';
      });
  },
});

export const { increment, decrement, incrementByAmount, addHero } = heroSlice.actions;

export default heroSlice.reducer;
