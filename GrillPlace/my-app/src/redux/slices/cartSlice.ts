import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../utils/getCartfromLS';
import { getTotalPrice } from '../../utils/totalPrice';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  souce: number | string;
  count: number;
}

type CartSliceState = {
  totalPrice: number;
  items: CartItem[]
}

const { items, totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
  totalPrice,
  items
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
          const findItem = state.items.find((obj) => obj.id === action.payload.id)
          if (findItem) {
            findItem.count++;
          }
          else {
            state.items.push({
                ...action.payload,
                count: 1
            })
          }

      state.totalPrice = getTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>){
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = getTotalPrice(state.items);

    },
    removeItem (state, action: PayloadAction<string>) {
        state.items = state.items.filter((obj) => obj.id !== action.payload)
        state.totalPrice = getTotalPrice(state.items);

    },
    clearItems (state) {
        state.items = [];
        state.totalPrice = 0;
    }
    },

})


export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id:string) => (state: RootState) => state.cart.items.find((obj:any) => obj.id === id)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer