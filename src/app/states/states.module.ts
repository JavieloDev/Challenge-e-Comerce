import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { cartReducer } from './car.reducer'; // Asegúrate de importar tu reducer

@NgModule({
  imports: [
    StoreModule.forRoot({
      auth: authReducer,
      // cart: cartReducer // No uses paréntesis aquí
    }),
    StoreModule.forFeature('cart', cartReducer)
  ],
})
export class AppStoreModule {}
