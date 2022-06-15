import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignInAdminComponent } from 'src/app/private/sign-in-admin/sign-in-admin.component';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(private dialog: MatDialog) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  signUpRequest() {}

  openSignInDialog() {
    this.dialog.open(SignInAdminComponent);
  }
}
