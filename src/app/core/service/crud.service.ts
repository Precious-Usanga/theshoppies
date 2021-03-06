import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
    ) { }

  // createData(endpoint: string, data): Observable<any> {
  //   const url = this.baseUrl + endpoint;
  //   this.spinner.show();
  //   return this.http.post<any>(url, data).pipe(
  //     map(response => {
  //       this.spinner.hide();
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  getData(endpoint: string): Observable<any> {
    const url = this.baseUrl + endpoint;
    return this.http.get<any>(url).pipe(
      map(response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // updateData(endpoint, data): Observable<any> {
  //   const url = this.baseUrl + endpoint;
  //   this.spinner.show();
  //   return this.http.put<any>(url, data).pipe(
  //     map(response => {
  //       this.spinner.hide();
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  // deleteData(endpoint, data): Observable<any> {
  //   const url = this.baseUrl + endpoint;
  //   this.spinner.show();
  //   return this.http.delete<any>(url, data).pipe(
  //     map(response => {
  //       this.spinner.hide();
  //       return response;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError (error.error);
    } else {
      return throwError (error);
    }
  }
}
