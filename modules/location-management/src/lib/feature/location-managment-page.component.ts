import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-location-managment-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-managment-page.component.html',
  styleUrl: './location-managment-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationManagmentPageComponent {}
