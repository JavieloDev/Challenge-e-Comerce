// product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadProducts } from '../states/product.action';
import { initialProductState } from '../states/product.state';

const _productReducer = createReducer(
  initialProductState,
  on(loadProducts, (state, { products }) => ({
    ...state,
    products: [...products]
  }))
);

export function productReducer(state: any, action: any) {
  return _productReducer(state, action);
}
