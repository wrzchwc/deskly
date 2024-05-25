import { catchError, of, OperatorFunction } from 'rxjs';

export function httpError<T>(): OperatorFunction<T, T | undefined> {
  return catchError(() => of(undefined));
}
