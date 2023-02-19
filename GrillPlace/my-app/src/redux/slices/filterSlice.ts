import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type FilterState = {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort
}

export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title'
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
}

const initialState: FilterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'popularity',
    sortProperty: SortPropertyEnum.RATING
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
        state.categoryId = Number(action.payload.categoryId)
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'popularity',
          sortProperty: SortPropertyEnum.RATING
        }
      }
    }
  },
})

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer