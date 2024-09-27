import {signal} from '@angular/core';

export interface AuthState {
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
};

export const authSignal = signal<AuthState>(initialAuthState);
