import {HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {NotificationService} from '../../service/notification.service';
import {HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable, catchError, tap} from 'rxjs';
import {throwError} from 'rxjs';

export const httpInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const notificationService = inject(NotificationService);

  notificationService.showNotification('Realizando una petición HTTP');
  return next(req).pipe(
    tap({
      next: (event) => {
      },
      error: (error) => {
        notificationService.showNotification(`Error: ${error.message}`);
      },
    }),
    catchError((error) => {
      return throwError(() => error);
    })
  );
};
