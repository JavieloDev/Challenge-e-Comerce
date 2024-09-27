import {Injectable, signal} from '@angular/core';
import {AuthState} from "../signals/auth/auth.state";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = signal<AuthState>({ isAuthenticated: false});

  constructor() {}

  // Método para obtener el estado de autenticación
  getAuthState() {
    return this.authState;
  }

  // Método para iniciar sesión
  login() {
    // Aquí podrías realizar la lógica de autenticación
    this.authState.set({ isAuthenticated: true });
  }

  // Método para cerrar sesión
  logout() {
    this.authState.set({ isAuthenticated: false });
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated() {
    return this.authState().isAuthenticated;
  }
}
