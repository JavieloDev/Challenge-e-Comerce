import {Injectable, signal} from '@angular/core';
import {MenuState} from "../signals/menu/menu.state";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuState = signal<MenuState>({ isMenuOpen: false});

  constructor() {}



  menuIn() {
    this.menuState.set({ isMenuOpen: true });
  }


  menuOut() {
    this.menuState.set({ isMenuOpen: false });
  }


  isMenuOpen() {
    return this.menuState().isMenuOpen;
  }
}
