import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss'],
})
export class AddBooksComponent implements OnInit {
  public _addform: FormGroup;
  book_found = false;
  book_data = null;

  book_types = [
    {
      name: 'Fiction',
      value: 0,
    },
    {
      name: 'Sci-Fi',
      value: 1,
    },
    {
      name: 'Philosophy',
      value: 2,
    },
    {
      name: 'Humor',
      value: 3,
    },
    {
      name: 'Thriller',
      value: 4,
    },
    {
      name: 'Devotional',
      value: 5,
    },
    {
      name: 'Horror',
      value: 6,
    },
    {
      name: 'Romance',
      value: 7,
    },
    {
      name: 'Drama',
      value: 8,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<AddBooksComponent>
  ) {}

  ngOnInit() {
    this._addform = this.fb.group({
      isbn: [null, [Validators.required]],

      type: [null, [Validators.required]],
    });
  }

  getSelectedTypeName() {
    const typeCode = this._addform.get('type').value;
    const selectedType = this.book_types.find(
      (type) => type.value === typeCode
    );
    return selectedType ? selectedType.name : 'Select Type';
  }

  onSubmit() {
    let dateString = this.book_data[0].volumeInfo.publishedDate;
    let api_data = {
      isbn: this._addform.value.isbn,
      title: this.book_data[0].volumeInfo.title,
      description: this.book_data[0].volumeInfo.description,
      author: this.book_data[0].volumeInfo.authors.join(''),
      publisher: 'Odoo',
      published_year: parseInt(dateString.substring(0, 4), 10),
      genre: this._addform.value.type,
      quantity: 1,
      image: [this.book_data[0].volumeInfo.imageLinks.smallThumbnail],
    };

    console.log(api_data, 'API');

    this.apiService.addBook(api_data).subscribe((data) => {
      console.log(data, 'RESPONSE');
      this.dialogRef.close({});
    });
  }

  findISBN() {
    let api_data = {
      isbn: this._addform.value.isbn,
    };

    this.apiService.findIsbn(api_data).subscribe((data: any) => {
      console.log(data, 'RESPONSE................');
      if (data && data.totalItems > 0) {
        this.book_found = true;
        this.book_data = data.items;
        console.log(this.book_data, 'BOOK data');
      }
    });
  }
}
