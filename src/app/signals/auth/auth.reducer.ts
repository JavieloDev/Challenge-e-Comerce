import {createReducer, on} from '@ngrx/store';
import {login, logout} from './auth.action';
import {initialAuthState, AuthState} from './auth';

const _authReducer = createReducer(
  initialAuthState,
  on(login, (state) => ({...state, isAuthenticated: true})),
  on(logout, (state) => ({...state, isAuthenticated: false}))
);

export function authReducer(state: AuthState | undefined, action: any) {
  return _authReducer(state, action);
}
