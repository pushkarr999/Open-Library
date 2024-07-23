import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {}

  public _loginform: FormGroup;
  ngOnInit() {
    this._loginform = this.fb.group({
      email: [null, [Validators.required]],
      newPassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  onSubmit() {
    console.log('Changed password', this._loginform.value);
    const data = {
      email: localStorage.getItem('email'),
      password: this._loginform.value.newPassword,
    };
    try {
      this._apiService.changePassword(data).subscribe((data: any) => {
        this.dialogRef.close({ data: true });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
