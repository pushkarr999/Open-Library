import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBooks() {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('limit', 100).set('skip', 0),
    };
    return this.http
      .get(environment.api_endpoint + 'api/v1/books', _httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUsers() {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: localStorage.getItem('authToken'),
      }),
      params: new HttpParams().set('limit', 100).set('skip', 0),
    };
    return this.http
      .get(environment.api_endpoint + 'api/v1/users', _httpOptions)
      .pipe(catchError(this.handleError));
  }

  searchBooks(data: any) {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: localStorage.getItem('authToken'),
      }),
      params: new HttpParams()
        .set('limit', 100)
        .set('skip', 0)
        .set('text', data),
    };
    return this.http
      .get(environment.api_endpoint + 'api/v1/books', _httpOptions)
      .pipe(catchError(this.handleError));
  }

  getHistory(data) {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: localStorage.getItem('authToken'),
      }),
    };
    return this.http
      .post(environment.api_endpoint + 'api/v1/history', data, _httpOptions)
      .pipe(catchError(this.handleError));
  }

  changePassword(data) {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: localStorage.getItem('authToken'),
      }),
    };
    return this.http
      .put(
        environment.api_endpoint + 'api/v1/users/changepassword',
        data,
        _httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  createHistory(data) {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: localStorage.getItem('authToken'),
      }),
    };
    return this.http
      .post(
        environment.api_endpoint + 'api/v1/history/create',
        data,
        _httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  addBook(data) {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: localStorage.getItem('authToken'),
      }),
    };
    return this.http
      .post(
        environment.api_endpoint + 'api/v1/books/create',
        data,
        _httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  findIsbn(data) {
    let _httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('q', `isbn:${data.isbn}`),
    };
    return this.http
      .get('https://www.googleapis.com/books/v1/volumes', _httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
