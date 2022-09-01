import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService,
    private messageService: MessageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.localStorageService.get('jwt_token');

    if (token) {
      req = req.clone({
        url: req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
              errorMsg = `Error (client side): ${error.error.message}`;
            } else {
              errorMsg = `Error (server side) Code: ${error.status},  Message: ${error.message}`;
          }

          let detail;
          if (error.error?.code) {
            detail = `(${error.error.code}) - ${error.error.message}`
          } else {
            detail = '(-1) - Unknown error';
          }

          this.messageService.add({
            key: 'bottom-center-toast',
            severity: 'error',
            summary: 'Error',
            detail: detail
          });

          return throwError(() => errorMsg);
      })
  );
  }
}
