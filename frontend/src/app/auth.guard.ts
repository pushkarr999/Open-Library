import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Logged In');
      return true;
    } else {
      console.log('Not Logged In');

      this.router.navigate(['/login']);
      return false;
    }
  }
}
