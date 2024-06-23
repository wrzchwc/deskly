import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from './auth.selectors';
import { AUTH_HEADER } from './auth.model';

export function jwtInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token = inject(Store).selectSignal(selectToken);
  if (!token) {
    return next(request);
  }
  return next(
    request.clone({ setHeaders: { [AUTH_HEADER]: `Bearer ${token()}` } })
  );
}
