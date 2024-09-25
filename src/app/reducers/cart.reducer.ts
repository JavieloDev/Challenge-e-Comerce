// cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addItemToCart, removeItemFromCart } from '../states/cart.action';
import { initialCartState } from '../states/cart.state';

const _cartReducer = createReducer(
  initialCartState,
  on(addItemToCart, (state, { item }) => ({
    ...state,
    items: [...state.items, item]
  })),
  on(removeItemFromCart, (state, { itemId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId)
  }))
);

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
