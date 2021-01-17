import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({
                                          url: this.fixUrl(request.url)
                                        });
    return next.handle(clonedRequest);
  }

  private fixUrl(url: string) {
    if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return `${url}&apikey=${environment.apikey}`;
    } else {
      return `${environment.apiBaseUrl}${url}&apikey=${environment.apikey}`;
    }
  }
}
