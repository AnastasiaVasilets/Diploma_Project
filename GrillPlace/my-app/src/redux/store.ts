import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import dish from './slices/dishesSlice';
import { useDispatch } from 'react-redux';
import user from './slices/userSlice'


export const store = configureStore({
  reducer: {
    filter,
    cart,
    dish,
    user
  },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()