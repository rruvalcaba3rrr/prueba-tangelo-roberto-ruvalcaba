import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  public signInForm: FormGroup;

  constructor(private dialog: MatDialog) {
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  signInRequest() {
    var values = this.signInForm.value;

  }

  openSignUpDialog() {
    this.dialog.open(SignUpFormComponent);
  }
}
