import { filter, Observable, pipe, switchMap, UnaryFunction } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

export function modalResult<T, R>(): UnaryFunction<
  Observable<MatDialogRef<T, R | undefined>>,
  Observable<R>
> {
  return pipe(
    switchMap((dialogRef) => dialogRef.afterClosed()),
    filter(Boolean)
  );
}
