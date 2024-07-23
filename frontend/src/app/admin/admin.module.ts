import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrarionListComponent } from './librarion-list/librarion-list.component';
import { AdminRoutingModule } from './admin.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { InviteLibrarianModalComponent } from './invite-librarian-modal/invite-librarian-modal.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [LibrarionListComponent, InviteLibrarianModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    OverlayModule,
    CoreModule,
  ],
})
export class AdminModule {}
