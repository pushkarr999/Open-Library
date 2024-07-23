import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(api_data: any): Observable<HttpResponse<any>> {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response',
    };
    return this.http
      .post<any>(environment.api_endpoint + 'api/v1/users/login', api_data, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  registerUser(data) {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post(
        environment.api_endpoint + 'api/v1/users/register',
        data,
        _httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}

// test@gmail.com - Test@1234
