// product.state.ts
import { signal } from '@angular/core';

export interface ProductState {
  products: any[]; // Cambia 'any' por el tipo de producto que estés utilizando
}

export const initialProductState: ProductState = {
  products: []
};

export const productSignal = signal<ProductState>(initialProductState);
