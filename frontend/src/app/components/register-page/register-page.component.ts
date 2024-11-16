import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CustomValidators } from '../login-page/custom-validators';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  message: string = '';
  messageType: 'success' | 'error' = 'error';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, CustomValidators.phoneNumber]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    }, { validators: CustomValidators.matchPassword });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          this.messageType = 'success';
          this.message = 'Registration successful!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error => {
          this.messageType = 'error';
          this.message = 'Registration failed: ' + error.error.message;
        }
      );
    } else {
      this.messageType = 'error';
      this.message = 'Form is invalid';
    }
  }
}
