import { ApplicationConfig, forwardRef, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SeletorPassageiroComponent } from './modules/modal/seletor-passageiro/seletor-passageiro.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
