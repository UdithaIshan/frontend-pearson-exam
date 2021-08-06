import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  base_path = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      alert(`An error occurred: ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code
      alert(`Server responded with code: ${error.status}`);
    }
    // return an observable with an error message
    return throwError('Something bad happened; please try again later.');
  }

  createCountry(item: Country): Observable<Country> {
    return this.http
      .post<Country>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getCountry(id: number): Observable<Country> {
    return this.http
      .get<Country>(`${this.base_path}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getList(): Observable<Country> {
    return this.http
      .get<Country>(this.base_path)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateCountry(id: number, item: Country): Observable<Country> {
    return this.http
      .put<Country>(
        `${this.base_path}/${id}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteCountry(id: number) {
    return this.http
      .delete<Country>(`${this.base_path}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
