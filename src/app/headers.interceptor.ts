import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token");
    console.log(token);
    let req = request.clone({
      setHeaders: {
        Authorization: "Bearer "+token?.toString(),
      },
    });
    return next.handle(req).pipe(catchError(err => {
      if ([401, 403].includes(err.status)) {
        localStorage.removeItem('token')
        this.router.navigateByUrl('/login');
      }
      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
    }));
  }
  handleAuthError(err: HttpErrorResponse): Observable<any> {
    
    if (err.status === 403 || err.status === 401) {
      localStorage.removeItem('token')
      this.router.navigateByUrl('/login');
    }
    return throwError(() => err)
  }
}
