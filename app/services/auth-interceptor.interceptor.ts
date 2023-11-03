import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './loginService';


@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = request;

    const jwtToken = this.loginService.getToken();
    // const jwtToken ='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW5naHByYXR5dXNoNDk0QGdtYWlsLmNvbSIsImlhdCI6MTY4Nzk3MTU0MX0.sz-MbgeaIcoMR0olikBZm_bk215WjxxVx_n-dh5cbX4'
    if (jwtToken != null) {
      authReq = authReq.clone({
        setHeaders: { 'Authorization': `Bearer${jwtToken}` },
      });
    }

    return next.handle(authReq);
  }
}
