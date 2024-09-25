import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './reducers/cart.reducer';
import { productReducer } from './reducers/product.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      cart: cartReducer,
      products: productReducer
    })
    // Otras importaciones...
  ],
})
export class AppModule {}
