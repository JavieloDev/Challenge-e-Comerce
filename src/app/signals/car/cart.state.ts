import { signal, computed } from '@angular/core';
import { Product } from '../../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}


export const cartSignal = signal<CartItem[]>([]); // Carrito vacío inicialmente

// Total de artículos en el carrito (se actualizan los calores automaticamente con el computed)
export const totalItemCountSignal = computed(() =>
  cartSignal().reduce((total, item) => total + item.quantity, 0)
);

// Total de los artículos en el carrito
export const totalPriceSignal = computed(() =>
  cartSignal().reduce((total, item) => total + item.product.price * item.quantity, 0)
);
