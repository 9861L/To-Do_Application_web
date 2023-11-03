import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/loginService';
import { inject } from '@angular/core';

export const registerGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  //if the user  isLoggedIn it return true otherwise false
  // return !loginService.isLoggedIn()
  return true;
};
