import { signal, computed } from '@angular/core';
import { Product } from '../../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

// Estado inicial del carrito
export const cartSignal = signal<CartItem[]>([]); // Carrito vacío inicialmente

// Computamos el total de artículos en el carrito
export const totalItemCountSignal = computed(() =>
  cartSignal().reduce((total, item) => total + item.quantity, 0)
);

// Computamos el precio total de los artículos en el carrito
export const totalPriceSignal = computed(() =>
  cartSignal().reduce((total, item) => total + item.product.price * item.quantity, 0)
);
