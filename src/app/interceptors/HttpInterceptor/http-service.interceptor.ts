import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {

  constructor() {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const modified = request.clone({
      headers: request.headers
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
    })

    return next.handle(modified);
  }
}
