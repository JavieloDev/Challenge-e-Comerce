import {createAction, props} from '@ngrx/store';
import {Product} from "../../models/product";


export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: Product }>()
);


export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ itemId: Product }>()
);
