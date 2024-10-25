import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@deskly/shared/navigation';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AuthFacade } from '@deskly/shared/auth';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, MatSidenavModule, MatButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly isAuthenticated = this.authFacade.isAuthenticated;
  readonly isManager = this.authFacade.isManager;

  constructor(private readonly authFacade: AuthFacade) {}

  signOut() {
    this.authFacade.signOut();
  }
}
