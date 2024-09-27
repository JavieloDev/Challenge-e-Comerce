import {menuSignal} from './menu.state';


export const login = () => {
  menuSignal.update(state => ({
    ...state,
    isAuthenticated: true,
  }));
};


export const logout = () => {
  menuSignal.update(state => ({
    ...state,
    isAuthenticated: false,
  }));
};
