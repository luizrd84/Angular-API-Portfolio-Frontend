import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let token = undefined;

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('auth_token');
  }

  

  if (token) {
    if(!authService.isTokenExpired()) {
      return true; 
    }    
  }

  // Se não tem token, manda para a Home (ou Login)
  console.warn('Acesso negado! Redirecionando...');
  router.navigate(['/login']); 
  return false;
};