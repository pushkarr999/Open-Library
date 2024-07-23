import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countrylist } from 'src/app/app.helper';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public _signinform: FormGroup;
  emailPattern =
    '^[a-zA-Z]{1,}[.+_-]{0,1}[a-zA-Z0-9]{1,}@[a-zA-Z]{1,}[.+_-]{1}[a-zA-Z]{2,}[.+_-]{0,1}[a-zA-Z]{0,3}$';

  role: number = 0;

  countrylist: any = countrylist;
  selected = countrylist.find(function (x) {
    return x.iso2 == 'in';
  }).dialCode;

  constructor(
    private fb: FormBuilder,
    private _authenticationService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this._signinform = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ]),
      ],
      ph_no: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      role: [0, Validators.compose([Validators.required])],
      countrycode: [91, Validators.compose([Validators.required])],
      username: [
        null,
        Validators.compose([Validators.required, Validators.pattern(/^\S*$/)]),
      ],
    });
  }

  getSelectedCountry() {
    const countryCode = this._signinform.value.countrycode;
    const selectedCountry = this.countrylist.find(
      (country) => country.dialCode === countryCode
    );
    return selectedCountry
      ? `+${selectedCountry.dialCode} - ${selectedCountry.name}`
      : '';
  }

  onSubmit() {
    console.log(this._signinform, 'Form Data');
    //role is 2 because this is user registration
    let api_data = {
      name: this._signinform.value.name,
      email: this._signinform.value.email,
      password: this._signinform.value.password,
      role: 2,
      country_code: this._signinform.value.countrycode,
      mobile_no: this._signinform.value.ph_no,
    };

    this._authenticationService.registerUser(api_data).subscribe((data) => {
      console.log(data, 'register');
      this.router.navigateByUrl('/login');
    });
  }
}
