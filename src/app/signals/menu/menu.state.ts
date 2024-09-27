import {signal} from '@angular/core';

export interface MenuState {
  isMenuOpen: boolean;
}

export const initialAuthState: MenuState = {
  isMenuOpen: false,
};

export const menuSignal = signal<MenuState>(initialAuthState);
