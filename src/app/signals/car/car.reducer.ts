import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem } from './cart.action';
import { initialCartState, CartState } from './cart.state';


const _cartReducer = createReducer(
  initialCartState,
  on(addItem, (state, { item }) => {
    console.log(item)
    const newState = {
      ...state,
      items: [...state.items, item], // Agrega el nuevo artículo al carrito
    };
    console.log('Nuevo estado del carrito:', newState); // Verifica lo que se está devolviendo
    return newState;

  }),

  on(removeItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId), // Elimina el artículo del carrito
  }))
);

export function cartReducer(state: CartState | undefined, action: any) {
  return _cartReducer(state, action);
}
