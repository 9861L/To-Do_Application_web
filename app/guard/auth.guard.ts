import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/loginService';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  if (loginService.isLoggedIn()) {
    return true;
  }
  router.navigateByUrl('login');
  return false;
};
