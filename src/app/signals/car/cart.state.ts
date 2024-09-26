import {Product} from "../../models/product";

export interface CartState {
  items: any[];
}

export const initialCartState: CartState = {
  items: [],
};
