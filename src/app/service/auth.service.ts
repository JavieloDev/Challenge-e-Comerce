// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Cambia esto según tu lógica de autenticación

  isAuthenticated(): boolean {
    return this.loggedIn; // Devuelve true o false según el estado de autenticación
  }

  login() {
    this.loggedIn = true; // Simula un inicio de sesión
  }

  logout() {
    this.loggedIn = false; // Simula un cierre de sesión
  }
}
