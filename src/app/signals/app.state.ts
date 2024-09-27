// import { CartState } from './car/cart.state';
import { AuthState } from './auth/auth'; // Si tienes un estado de autenticación

export interface AppState {
  // cart: CartState;
  auth: AuthState; // Si tienes autenticación
}
