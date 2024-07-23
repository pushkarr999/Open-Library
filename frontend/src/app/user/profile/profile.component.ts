import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(public dialog: MatDialog, private _apiService: ApiService) {}
  borrowedBooks = [];
  returnedBooks = [];
  username = 'John Doe';

  ngOnInit() {
    this.getBooks();
    this.username = localStorage.getItem('username');
  }

  getBooks() {
    try {
      this._apiService.getHistory({ type: 0 }).subscribe((data: any) => {
        console.log(data, 'datatttattatatata........................');
        this.borrowedBooks = data.result.data;
      });
    } catch (error) {
      console.log(error);
    }
    try {
      this._apiService.getHistory({ type: 1 }).subscribe((data: any) => {
        console.log(data, 'datatttattatatata........................');
        this.returnedBooks = data.result.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  returnBook(book: any) {
    const data = {
      type: 1, // return
      book_id: book.books_id._id,
      time: Math.round(new Date().getTime() / 1000),
    };
    try {
      this._apiService.createHistory(data).subscribe((data: any) => {
        this.ngOnInit();
      });
    } catch (error) {
      console.log(error);
    }
  }

  changePassword() {
    const dialogCart = this.dialog.open(ChangePasswordComponent, {
      width: '275px',
      height: '25vh',
    });

    dialogCart.afterClosed().subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
}
