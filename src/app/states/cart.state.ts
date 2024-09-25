import {Product} from "../models/product";

export interface CartState {
  items: Product[]; // Cambia 'any' por el tipo adecuado según tus productos
}

export const initialCartState: CartState = {
  items: [], // Inicializa 'items' como un array vacío
};
