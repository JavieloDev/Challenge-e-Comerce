import {authSignal} from './auth.state';

// Iniciar sesión
export const login = () => {
  authSignal.update(state => ({
    ...state,
    isAuthenticated: true,
  }));
};

// Cerrar sesión
export const logout = () => {
  authSignal.update(state => ({
    ...state,
    isAuthenticated: false,
  }));
};
