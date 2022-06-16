import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrls: ['./sign-in-admin.component.scss'],
})
export class SignInAdminComponent implements OnInit {
  public loginForm: FormGroup;
  public showError = false;
  public loading = false;
  public loginError = {
    message: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fb_service: FirebaseAuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async login() {
    this.showError = false;
    this.loading = true;
    try {
      await this.fb_service.loginUser(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      this.router.navigateByUrl('adminpanel/dashboard');
    } catch (error: any) {
      console.log(error);
      this.showError = true;
      this.loading = false;
      this.loginError.message = error.message;
    }
  }
}
