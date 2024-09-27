import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from "@angular/common/http";
import {NotificationService} from "./service/notification.service";
import {httpInterceptorFn} from "./shared/interceptor/http.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(
    withInterceptors([httpInterceptorFn])
  ),
    NotificationService,]
};
