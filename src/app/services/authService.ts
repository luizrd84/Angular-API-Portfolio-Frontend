import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // private apiUrl = 'http://localhost:3000/auth/login';
  private apiUrl = 'https://meu-portfolio-backend-latest.onrender.com/auth/login';

  private isAdmin = signal(false);

  constructor(private http: HttpClient) {

  }

  postLogin(data: any) {
    return this.http.post(`${this.apiUrl}`, data);
  }
   

  loginAdmin() {
    this.isAdmin.set(true);
  }

  logout() {
    this.isAdmin.set(false);
  }

  decodeToken(token: string) {
    const payload = token.split('.')[1]; // O JWT tem 3 partes separadas por '.'
    const decoded = JSON.parse(atob(payload)); // Decodifica a parte do meio (dados)
    return decoded;
  }

  isTokenExpired(): boolean {
    
    let token = undefined;

    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('auth_token');
    }

    if (!token) return true;

    const decoded = this.decodeToken(token);
    const expirationDate = decoded.exp * 1000; // O 'exp' do JWT é em segundos, JS usa milisegundos
    
    return Date.now() > expirationDate;
  }

}


