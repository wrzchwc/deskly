import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthUrlGenerator } from '../data/auth-url-generator.service';

@Component({
  selector: 'deskly-home-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  readonly urlGenerator = inject(AuthUrlGenerator);
}
