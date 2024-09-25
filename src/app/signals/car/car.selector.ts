import {createSelector} from '@ngrx/store';
import {CartState} from './cart.state';

export const selectCartItems = createSelector(
  (state: { cart: CartState }) => state.cart,
  (cart: CartState) => cart.items
);
