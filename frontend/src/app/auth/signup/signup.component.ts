import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const EMAIL = 0;
const MOBILE = 1;
const INVALID = 2;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public _loginform: FormGroup;
  emailPattern =
    '^[a-zA-Z]{1,}[.+_-]{0,1}[a-zA-Z0-9]{1,}@[a-zA-Z]{1,}[.+_-]{1}[a-zA-Z]{2,}[.+_-]{0,1}[a-zA-Z]{0,3}$';

  constructor(
    private fb: FormBuilder,
    private _authenticationService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this._loginform = this.fb.group({
      email: [null, [Validators.required]],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  validate(email) {
    const mail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const mobile = /^[1-9]{1}[0-9]{9}$/;
    if (mail.test(String(email).toLowerCase())) {
      return EMAIL;
    } else if (mobile.test(String(email).toLowerCase())) {
      return MOBILE;
    } else {
      return INVALID;
    }
  }

  onSubmit() {
    console.log(this._loginform, 'LOGIN');

    let uname = this._loginform.value.email;

    let api_data: any = {
      password: this._loginform.value.password,
    };

    console.log(this.validate(uname));

    switch (this.validate(uname)) {
      case EMAIL:
        api_data.email = uname;
        break;
      case MOBILE:
        api_data.mobile_no = uname;
        break;

      // case INVALID:
      //   // this._toastr.showError("", "Invalid mobile number or email address");
      //   return false;
      //   break;

      default:
        break;
    }

    this._authenticationService.login(api_data).subscribe(
      (response: HttpResponse<any>) => {
        console.log('!! response from login', response);
        const token = response.headers.get('token');
        console.log('Token:', token);
        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('role', response.body.result.role);
          localStorage.setItem('user', response.body.result._id);
          localStorage.setItem('username', response.body.result.name);
          localStorage.setItem('email', response.body.result.email);
          this.router.navigateByUrl('/lib');
        }
      },
      (error) => {
        console.error('!! error from login', error);
        alert(error);
        // Handle error from login attempt here
      }
    );
  }
}
