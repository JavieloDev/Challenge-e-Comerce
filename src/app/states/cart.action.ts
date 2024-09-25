import { createAction, props } from '@ngrx/store';
import {Product} from "../models/product";

// Acción para agregar un artículo al carrito
export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: Product }>() // Cambia 'any' por el tipo adecuado
);

// Acción para eliminar un artículo del carrito
export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ itemId: Product }>() // Cambia 'number' por el tipo adecuado según tu lógica
);
