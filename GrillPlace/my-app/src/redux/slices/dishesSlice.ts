import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { Sort } from './filterSlice';

export type FetchDishesArguments = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number
}

export type SearchDishParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string
}


export const fetchDishes = createAsyncThunk<DishItem[], SearchDishParams>('dishes/fetchDishesStatus',
    async (params) => {
        const {sortBy, order, category, search, currentPage} = params;
        const { data } = await axios.get<DishItem[]>(
            `https://63e0b25d65b57fe606478285.mockapi.io/dishes?limit=6&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data;
    }
)

type DishItem = {
  id: string;
  title: string;
  price: number;
  types: number [];
  img: string;
  souce: string[];
  rating: number
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface DishesSliceState {
  items: DishItem[];
  status: Status
}

const initialState: DishesSliceState = {
  items: [],
  status: Status.LOADING,
}

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<DishItem[]>) {
          state.items = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchDishes.pending, (state, action) => {//отправка запроса
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchDishes.fulfilled, (state, action) => {//запрос выполнен
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });

    builder.addCase(fetchDishes.rejected, (state, action) => {//запрос отклонен
      state.status = Status.ERROR ;
      state.items = [];
    });
  }
        
})

export const selectDishInfo = (state: RootState) => state.dish;

export const { setItems } = dishSlice.actions;

export default dishSlice.reducer