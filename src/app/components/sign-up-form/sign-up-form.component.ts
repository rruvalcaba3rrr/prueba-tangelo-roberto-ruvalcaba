import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  public signUpForm: FormGroup;
  public errorInfo = {
    hasError: false,
    errMessage: '',
  };

  constructor(private dialog: MatDialog) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cedula: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  signUpRequest() {
    var values = this.signUpForm.value;
    if (values.password != values.confirmpassword) {
      this.errorInfo.hasError = true;
      this.errorInfo.errMessage =
        'Las contraseñas no coinciden, verifiquelas e intente de nuevo';
      return;
    }
    var client: Client ={
      name: values.name,
      email: values.email,
      cedula: values.cedula,
    }
  }

  openSignInDialog() {
    this.dialog.open(SignInFormComponent);
  }
}
