import {Product} from "../../models/product";

export interface CartState {
  items: Product[];
}

export const initialCartState: CartState = {
  items: [],
};
