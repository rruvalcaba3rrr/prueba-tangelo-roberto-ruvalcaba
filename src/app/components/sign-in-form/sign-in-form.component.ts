import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import Swal from 'sweetalert2';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  public signInForm: FormGroup;

  constructor(private dialog: MatDialog, private fb_service: FirebaseAuthService) {
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void { }

  async signInRequest() {
    var values = this.signInForm.value;
    try {
      Swal.fire('Iniciando sesión...', '', 'info');
      Swal.showLoading();
      await this.fb_service.loginUser(values.email, values.password);
      location.reload();

    } catch (error) {
      Swal.close();
      Swal.fire(
        'Lo sentimos',
        'Ha ocurrido un error inesperado, intente de nuevo más tarde',
        'error'
      )
    }

  }

  openSignUpDialog() {
    this.dialog.open(SignUpFormComponent);
  }
}
