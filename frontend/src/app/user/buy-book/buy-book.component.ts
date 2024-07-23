import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-buy-book',
  templateUrl: './buy-book.component.html',
  styleUrls: ['./buy-book.component.scss'],
})
export class BuyBookComponent {
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<BuyBookComponent>,
    @Inject(MAT_DIALOG_DATA) public _parentData
  ) {}

  returnDate: any;
  // Date filter function to allow only future dates
  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date > today : false;
  };

  buy() {
    if (this.returnDate) {
      const data = {
        type: 0, // return
        book_id: this._parentData._id,
        time: this.returnDate.getTime() / 1000,
      };
      try {
        this._apiService.createHistory(data).subscribe((data: any) => {
          this.dialogRef.close({ data: true });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
