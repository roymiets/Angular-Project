import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  message: string = '';
  messageType: 'success' | 'error' = 'error';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.verifyUserCredentials(email, password).subscribe(
        response => {
          if (response.message.includes('Success')) {
            this.setMessage('success', 'Login successful!');
            setTimeout(() => this.router.navigate(['/About']), 1000);
          } else {
            this.setMessage('error', 'Invalid username or password');
          }
        },
        error => {
          console.error('Error:', error);
          this.setMessage('error', 'Invalid username or password');
        }
      );
    }
  }

  private setMessage(type: 'success' | 'error', text: string) {
    this.messageType = type;
    this.message = text;
  }
}
