import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { BuyBookComponent } from '../buy-book/buy-book.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  searchQuery = null;
  books: any = [];

  constructor(public dialog: MatDialog, private _apiService: ApiService) {}

  ngOnInit() {
    this.getBooks();
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
    try {
      this._apiService.searchBooks(this.searchQuery).subscribe(
        (result: any) => {
          console.log('Get Result', result);
          this.books = result.result.data;
          // Handle successful login response here
        },
        (error: any) => {
          this.books = [];
        }
      );
    } catch (error) {
      this.books = [];
      console.log(error);
    }
  }
  getBooks() {
    try {
      this._apiService.getBooks().subscribe((data: any) => {
        console.log(data, 'datatttattatatata........................');
        this.books = data.result.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  bookBook(data: any) {
    const dialogCart = this.dialog.open(BuyBookComponent, {
      width: '300px',
      height: '20vh',
      data: data,
    });

    dialogCart.afterClosed().subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
}
