import {signal} from '@angular/core';

export interface ProductState {
  products: any[];
}

export const initialProductState: ProductState = {
  products: []
};

export const productSignal = signal<ProductState>(initialProductState);
