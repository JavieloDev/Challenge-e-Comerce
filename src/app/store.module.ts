import {bootstrapApplication} from '@angular/platform-browser';
import {provideStore} from '@ngrx/store';
import {cartReducer} from './signals/car/car.reducer';
import {AppComponent} from "./app.component";
import {authReducer} from "./signals/auth/auth.reducer";

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({
      auth: authReducer,
      cart: cartReducer // Asegúrate de agregar el reducer del carrito aquí
    }),
  ]
});
