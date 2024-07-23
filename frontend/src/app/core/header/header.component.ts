import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  role!: any;

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }
  list() {
    this.router.navigateByUrl('/lib/list');
  }

  myBooks() {
    this.router.navigateByUrl('/lib/profile');
  }

  logout() {
    localStorage.clear();
    console.log('Logging out');

    this.router.navigateByUrl('/login');
  }

  home() {
    this.router.navigateByUrl('/lib');
  }

  addLib() {
    this.router.navigateByUrl('/admin/librarian');
  }
}
