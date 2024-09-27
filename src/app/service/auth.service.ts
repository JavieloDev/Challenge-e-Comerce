import {Injectable, signal} from '@angular/core';
import {AuthState} from "../signals/auth/auth.state";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = signal<AuthState>({ isAuthenticated: false});

  constructor() {}



  login() {
    this.authState.set({ isAuthenticated: true });
  }


  logout() {
    this.authState.set({ isAuthenticated: false });
  }


  isAuthenticated() {
    return this.authState().isAuthenticated;
  }
}
