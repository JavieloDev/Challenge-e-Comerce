import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  // Método para agregar productos al carrito
  addToCart(product: Product, quantity: number) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex >= 0) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, añádelo con la cantidad proporcionada
      currentItems.push({ product, quantity });
    }

    this.cartItems.next(currentItems); // Actualiza el carrito con los nuevos valores
  }
  removeFromCart(product: Product) {
    const currentItems = this.cartItems.value; // Obtiene los items actuales del carrito
    const updatedItems = currentItems.filter(item => item.product.id !== product.id); // Filtra el producto a eliminar

    this.cartItems.next(updatedItems); // Actualiza el carrito con los nuevos valores
  }
  // Método para obtener los items del carrito
  getCartItems() {
    return this.cartItems.asObservable();
  }
}
