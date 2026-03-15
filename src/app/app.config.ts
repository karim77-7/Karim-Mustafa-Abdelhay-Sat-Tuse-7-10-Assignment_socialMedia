import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { errorInterceptor } from './core/interceptors/error/error-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import {provideTranslateService} from '@ngx-translate/core'
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader'




export const appConfig: ApplicationConfig = {
  providers: [  
    provideTranslateService({
      loader : provideTranslateHttpLoader({
        prefix : './i18n/',
        suffix : '.json'
      })
    }),
    importProvidersFrom(NgxSpinnerModule),
    provideToastr(),
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor , errorInterceptor , loadingInterceptor ]) )

  ]
};
