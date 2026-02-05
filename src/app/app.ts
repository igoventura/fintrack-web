import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './core/services/auth-service';

interface LoginRequest {
  username: string;
  password: string;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  private authService = inject(AuthService);
  protected readonly title = signal('fintrack-web');

  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  doLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.getRawValue();
      this.authService.login(username, password).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
