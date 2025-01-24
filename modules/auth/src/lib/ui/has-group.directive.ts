import { Directive, effect, inject, input } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserGroup } from '../domain/token-payload';
import { Store } from '@ngrx/store';
import { userGroup } from '../data/auth.selectors';

@Directive({
  selector: '[desklyHasGroup]',
  standalone: true,
  hostDirectives: [NgIf]
})
export class HasGroupDirective {
  private readonly ngIfDirective = inject(NgIf);
  private readonly store = inject(Store);

  private readonly userGroup = this.store.selectSignal(userGroup);

  readonly desklyHasGroup = input(UserGroup.BasicUsers);

  // @ts-expect-error: no error
  private readonly updateNgIf = effect(() => {
    // eslint-disable-next-line functional/immutable-data
    this.ngIfDirective.ngIf = this.userGroup() === this.desklyHasGroup();
  });
}
