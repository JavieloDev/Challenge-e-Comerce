import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem } from './cart.action'; // Asegúrate de importar las acciones
import { initialCartState, CartState } from './cart.state';

const _cartReducer = createReducer(
  initialCartState,
  on(addItem, (state, { item }) => ({
    ...state,
    items: [...state.items, item], // Agrega el nuevo artículo al carrito
  })),
  on(removeItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId.id!), // Elimina el artículo del carrito
  }))
);

// Exporta la función del reducer
export function cartReducer(state: CartState | undefined, action: any) {
  return _cartReducer(state, action);
}
