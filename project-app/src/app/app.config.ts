import {
  ApplicationConfig,
  ChangeDetectorRef,
  InjectionToken,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  provideHttpClient,
} from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    BrowserAnimationsModule,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      HttpClientXsrfModule.withOptions({
        cookieName: 'My-Xsrf-Cookie',
        headerName: 'My-Xsrf-Header',
      })
    ),
    
  ],
};
