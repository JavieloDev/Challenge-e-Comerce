import {Injectable} from '@angular/core';
import {Product} from '../models/product';
import {addToCart, removeFromCart} from "../signals/car/cart.action";
import {cartSignal} from "../signals/car/cart.state";

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {


  addToCart(product: Product, quantity: number) {
    addToCart({product: product, quantity: quantity});
  }

  getCartItems() {
    return cartSignal();
  }

  removeFromCart(product: Product) {
    removeFromCart(product.id);
  }
}
