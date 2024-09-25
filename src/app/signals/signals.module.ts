import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './auth/auth.reducer';
import {cartReducer} from './car/car.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      auth: authReducer,

    }),
    StoreModule.forFeature('cart', cartReducer)
  ],
})
export class AppStoreModule {
}
