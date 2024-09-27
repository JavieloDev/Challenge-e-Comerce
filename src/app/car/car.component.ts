import {ChangeDetectorRef, Component} from '@angular/core';

import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AsyncPipe, CommonModule, DecimalPipe} from "@angular/common";
import {CartService} from "../service/car.service";
import {Product} from "../models/product";
import {cartSignal, totalItemCountSignal, totalPriceSignal} from "../signals/car/cart.state";


export interface CartItem {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './car.component.html',
  imports: [
    DecimalPipe,
    AsyncPipe,
    CommonModule
  ]
})
export class CarComponent {
  cartItems = cartSignal();

  constructor(private cartService: CartService, private router: Router, private cdr: ChangeDetectorRef) {

  }

  checkout() {
    if (this.cartItems.length > 0) {
      this.cartItems.forEach(item => {
        const productId = item.product.id;
        const quantity = item.quantity;

        this.router.navigate(['/product', productId], {queryParams: {quantity: quantity}});
      });
    } else {
      console.log('El carrito está vacío, no se puede proceder al pago.');
    }
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems()
  }
}
