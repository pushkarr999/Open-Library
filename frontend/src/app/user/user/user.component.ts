import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBooksComponent } from 'src/app/add-books/add-books.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  searchQuery = null;

  constructor(private _apiService: ApiService, public dialog: MatDialog) {}

  role!: any;

  ngOnInit() {
    this.getBooks();
    this.role = localStorage.getItem('role');
  }
  newArrivals: any = [
    {
      image:
        'https://tse2.mm.bing.net/th?id=OIP.SlOEDd4qG_pradkmBlFPxwHaE7&pid=Api&P=0&h=220',
      title: 'Python Tricks: The Book',
      author: 'Dan Bader',
      year: '2017',
    },
    {
      image:
        'https://tse2.mm.bing.net/th?id=OIP.SlOEDd4qG_pradkmBlFPxwHaE7&pid=Api&P=0&h=220',
      title: 'Learning Scientific Programming with Python',
      author: 'Christian Hill',
      year: '2020',
      desc: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    },
    {
      image: 'path/to/image3.jpg',
      title: 'Powerful Python: The Most Impactful Patterns',
      author: 'Aaron Maxwell',
      year: '2017',
    },
  ];

  recommendedBooks: any = [];

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  getBooks() {
    try {
      this._apiService.getBooks().subscribe((data: any) => {
        console.log(data, 'datatttattatatata........................');
        this.newArrivals = data.result.data;
      });
    } catch (error) {
      console.log(error);
    }
    try {
      this._apiService.getHistory({ type: 0 }).subscribe((data: any) => {
        console.log(data, 'data');
        let genreCount = {};
        let bookIds = [];

        //count of genres that user has purchased
        data.result.data.forEach((book: any) => {
          let genre = book.books_id.genre;
          if (!genreCount[genre]) {
            genreCount[genre] = 1;
          } else {
            genreCount[genre] += 1;
          }
          bookIds.push(book.books_id._id);
        });

        let maxGenre = -1;
        let maxGenreCount = -1;

        let genreKeys = Object.keys(genreCount);

        genreKeys.forEach((key: any) => {
          if (genreCount[key] > maxGenreCount) {
            maxGenre = key;
          }
        });

        this.newArrivals.forEach((book: any) => {
          console.log('This is one book');
          if (book.genre == maxGenre && !bookIds.includes(book._id)) {
            this.recommendedBooks.push(book);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  addBooks() {
    const _viewdialogRef = this.dialog.open(AddBooksComponent, {
      width: '600px',
    });

    _viewdialogRef.afterClosed().subscribe(() => {
      this.getBooks();
    });
  }
}
