// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { routes } from './app/app.routes';
import {App} from './app/app';
import {provideHttpClient} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';
import {AuthModule} from '@auth0/auth0-angular';

// Bootstrap the root component and provide the routing configuration
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: 'dev-ygze30u5w7sexvdf.us.auth0.com',
        clientId: 'sUViHyv5T5BrC6XMbkUxLYEWdclHM7nS',

        authorizationParams: {
          redirect_uri: `${window.location.origin}/home`,
          scope: 'openid profile email'
        },

        cacheLocation: 'localstorage',
        useRefreshTokens: true,
      })
    ),
    // If you need features like withDebugTracing(), you add them here:
    // provideRouter(routes, withDebugTracing())
    provideHttpClient()
  ]
}).catch(err => console.error(err));
