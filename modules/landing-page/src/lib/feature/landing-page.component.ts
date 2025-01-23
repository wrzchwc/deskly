import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, map, startWith } from 'rxjs';
import { Store } from '@ngrx/store';
import { email } from '@deskly/shared/auth';

@Component({
  selector: 'deskly-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  private readonly store = inject(Store);

  readonly email = this.store.selectSignal(email);

  readonly date$ = interval(1000).pipe(startWith(Date.now()), map(() => Date.now()));
}
