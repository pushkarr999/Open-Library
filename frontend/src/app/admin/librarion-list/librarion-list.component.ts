import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InviteLibrarianModalComponent } from '../invite-librarian-modal/invite-librarian-modal.component';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-librarion-list',
  templateUrl: './librarion-list.component.html',
  styleUrls: ['./librarion-list.component.scss'],
})
export class LibrarionListComponent {
  constructor(public dialog: MatDialog, private _apiService: ApiService) {}
  data = [];

  ngOnInit() {
    this.getLibrarianList();
  }

  getLibrarianList() {
    try {
      this._apiService.getUsers().subscribe((data: any) => {
        console.log(data, 'data');
        this.data = data.result.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  inviteModal(role: number) {
    const dialogCart = this.dialog.open(InviteLibrarianModalComponent, {
      width: '600px',
      height: '80vh',
      data: role,
    });

    dialogCart.afterClosed().subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
}
