import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../models/product';
import {addToCart} from "../signals/car/cart.action";
import {cartSignal} from "../signals/car/cart.state";

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

  addToCart(product: Product, quantity: number) {
    addToCart({product: product, quantity: quantity});
  }

  getCartItems() {
    return cartSignal();
  }

  removeFromCart(product: Product) {
    console.log(product);

    const currentItems = this.getCartItems();
    console.log('Current items:', currentItems);

    const updatedItems = currentItems.filter(item => item.product.id !== product.id);

    console.log('Updated items:', updatedItems);

    cartSignal.set(updatedItems);
  }
}
