// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; // ---> 1. Import provideRouter

import { routes } from './app/app.routes';
import {App} from './app/app';
import {provideHttpClient} from '@angular/common/http'; // ---> 2. Import your routes

// Bootstrap the root component and provide the routing configuration
bootstrapApplication(App, {
  providers: [
    provideRouter(routes), // ---> 3. Add this to the providers array
    // If you need features like withDebugTracing(), you add them here:
    // provideRouter(routes, withDebugTracing())
    provideHttpClient()
  ]
}).catch(err => console.error(err));
