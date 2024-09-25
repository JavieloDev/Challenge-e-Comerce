import {createReducer, on} from '@ngrx/store';
import {addItem, removeItem} from './cart.action';
import {initialCartState, CartState} from './cart.state';

const _cartReducer = createReducer(
  initialCartState,
  on(addItem, (state, {item}) => ({
    ...state,
    items: [...state.items, item],
  })),
  on(removeItem, (state, {itemId}) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId.id!),
  }))
);


export function cartReducer(state: CartState | undefined, action: any) {
  return _cartReducer(state, action);
}
