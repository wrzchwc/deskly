import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@deskly/shared/navigation';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { HasGroupDirective, isAuthenticated, signOut } from '@deskly/shared/auth';
import { Store } from '@ngrx/store';
import { checkAuth } from '@deskly/shared/auth';
import { UserGroup } from '../../modules/shared/auth/src/lib/domain/token-payload';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, MatSidenavModule, MatButtonModule, HasGroupDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly UserGroup = UserGroup;

  readonly isAuthenticated = this.store.selectSignal(isAuthenticated);

  ngOnInit(): void {
    this.store.dispatch(checkAuth());
  }

  signOut() {
    this.store.dispatch(signOut());
  }
}
