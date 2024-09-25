import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CartState} from '../signals/car/cart.state';
import {selectCartItems} from '../signals/car/car.selector';
import {AsyncPipe, CommonModule} from "@angular/common";


@Component({
  selector: 'app-car',
  standalone: true,
  templateUrl: './car.component.html',
  imports: [
    AsyncPipe, CommonModule
  ]
})
export class CarComponent {
  cartItems$: Observable<any[]>;

  constructor(private store: Store<{ cart: CartState }>) {
    this.cartItems$ = this.store.select(selectCartItems);
  }
}
