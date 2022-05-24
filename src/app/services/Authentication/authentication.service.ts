import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) {}

  login(userCredentials: any): Observable<any[]> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, userCredentials).pipe(
      map((response: any) => {
        console.log(response['data'])
        
        const token: string = response['data']['token'];
        const user: any = response['data']['user'];

        const email: string = user?.email;
        const role: [] = user?.roles;
       
        if (token && token !== null && token !== undefined) {
          this.setToken(token);
          this.setUserEmail(email)
          this.setRole(role)
        }
        if (user && user !== null && user !== undefined) {
          this.setUser(user);
        }
        return response;
      })
    );
  }

  logout(user?: any) {
    localStorage.clear();
    return this.http.post(`${this.apiUrl}/auth/logout`, '').pipe(
      tap(() => {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
      })
    );
  }

  setToken(token: string): void {
    return localStorage.setItem('token', token);
  }
  setRole(role: any): void {
    return localStorage.setItem('role', role);
  }

  setUserEmail(email: string): void {
    return localStorage.setItem('email', email);
  }

  setUser(user: any): void {
    console.log(user)
    return localStorage.setItem('user', JSON.stringify(user));
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  getUser(): string {
    return localStorage.getItem('user') || '';
  }
}
