import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: UserComponent,
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent,
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    component: ListComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
