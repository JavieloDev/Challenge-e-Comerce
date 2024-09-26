import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router'; // Importa Router para redirección
import { Observable } from 'rxjs';
import { AppState } from '../signals/app.state'; // Importa la interfaz del estado global
import { selectCartItems } from '../signals/car/car.selector';
import {AsyncPipe, CommonModule, DecimalPipe} from "@angular/common";
import {CartService} from "../service/car.service";


export interface CartItem {
  product: {
    id: number; // ID del producto
    title: string; // Título del producto
    price: number; // Precio del producto
    image: string; // URL de la imagen del producto
  };
  quantity: number; // Cantidad del producto en el carrito
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
  _car: Observable<CartItem[]>;

  constructor(private cartService: CartService, private router: Router) {
    this._car = this.cartService.cartItems$;
    console.log(this._car)
  }

  checkout() {
    this._car.subscribe(items => {
      if (items.length > 0) {
        // Recorre todos los elementos del carrito
        items.forEach(item => {
          const productId = item.product.id; // ID del producto
          const quantity = item.quantity;    // Cantidad seleccionada

          // Redirige a la página de detalles del producto con su cantidad
          this.router.navigate(['/product', productId], { queryParams: { quantity: quantity } });
        });
      } else {
        console.log('El carrito está vacío, no se puede proceder al pago.');
      }
    });
  }

}
