import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../states/cart.state'; // Asegúrate de importar tu estado del carrito
import { selectCartItems } from '../states/car.selector';
import {AsyncPipe, CommonModule} from "@angular/common"; // Selector para obtener los artículos del carrito


@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  imports: [
    AsyncPipe,CommonModule
  ]
})
export class CarComponent {
  cartItems$: Observable<any[]>; // Observable para los artículos del carrito

  constructor(private store: Store<{ cart: CartState }>) {
    this.cartItems$ = this.store.select(selectCartItems); // Seleccionar los artículos del carrito
  }
}
