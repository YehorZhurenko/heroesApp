import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:3000/heroes';

export const fetchHeroes = createAsyncThunk(
  'hero/fetchHeroes',
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/?page=${page}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchHero = createAsyncThunk('hero/fetchHero', async (heroId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE}/${heroId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const createHero = createAsyncThunk(
  'hero/createHero',
  async (heroData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_BASE}/new`, heroData);
      dispatch(addHero(response.data));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateHero = createAsyncThunk(
  'hero/updateHero',
  async ({ id, updatedHero }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/${id}`, updatedHero, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteHero = createAsyncThunk(
  'hero/deleteHero',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE}/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const heroSlice = createSlice({
  name: 'hero',
  initialState: {
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
    },
  },

  extraReducers: (builder) => {
    builder

      // ───────────── FETCH HEROES ─────────────

      .addCase(fetchHeroes.pending, (state) => {
        state.status = 'loading';
        state.heroes = [];
        state.error = null;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.heroes = action.payload.heroes;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.status = 'rejected';
        state.heroes = [];
        state.error = action.payload;
      })

      // ───────────── FETCH SINGLE HERO ─────────────

      .addCase(fetchHero.pending, (state, action) => {
        state.status = 'loading';
        state.heroDetails = null;
        state.error = null;
      })
      .addCase(fetchHero.fulfilled, (state, action) => {
        state.heroDetails = action.payload;
        state.status = 'resolved';
      })
      .addCase(fetchHero.rejected, (state, action) => {
        state.status = 'rejected';
        state.heroDetails = null;
        state.error = action.payload;
      })

      // ───────────── CREATE HERO ─────────────

      .addCase(createHero.fulfilled, (state, action) => {
        state.heroDetails = action.payload;
        state.status = 'resolved';
      })
      .addCase(createHero.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createHero.rejected, (state, action) => {
        state.status = 'rejected';
        state.heroDetails = null;
        state.error = action.payload;
      })

      // ───────────── DELETE HERO ─────────────

      .addCase(deleteHero.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.heroes = state.heroes.filter((h) => h._id !== action.payload._id);
      })
      .addCase(deleteHero.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })

      // ───────────── CREATE HERO ─────────────

      .addCase(updateHero.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.heroDetails = action.payload;
      })
      .addCase(updateHero.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount, addHero } = heroSlice.actions;

export default heroSlice.reducer;
