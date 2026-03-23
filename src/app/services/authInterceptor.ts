import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  let token = undefined;

  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('auth_token');  
  }
  
  

  // 1. Se tiver token, clona a requisição e adiciona o Header
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 2. Envia a requisição e monitora erros de retorno
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se o servidor retornar 401, o token expirou ou é inválido
      if (error.status === 401) {
        console.warn('Token expirado ou inválido. Redirecionando para login...');
        localStorage.removeItem('auth_token'); // Limpa o lixo
        router.navigate(['/login']); // Manda pro login
      }
      return throwError(() => error);
    })
  );
};