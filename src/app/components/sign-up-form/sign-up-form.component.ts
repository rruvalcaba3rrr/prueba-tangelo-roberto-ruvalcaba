import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import Swal from 'sweetalert2';
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

  constructor(private dialog: MatDialog, private fb_service: FirebaseAuthService) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cedula: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void { }

  async signUpRequest() {
    var values = this.signUpForm.value;
    if (values.password != values.confirmpassword) {
      this.errorInfo.hasError = true;
      this.errorInfo.errMessage =
        'Las contraseñas no coinciden, verifiquelas e intente de nuevo';
      return;
    }
    var client: Client = {
      name: values.name,
      email: values.email,
      cedula: values.cedula,
    }

    try {
      Swal.fire('¡Guardando!', 'Se está cargando la información...', 'info');
      Swal.showLoading();

      var auth = await this.fb_service.signupUser(values.email, values.password);
      await this.fb_service.createClient(client, auth.user.uid);
      Swal.close();
      this.fb_service.logOutUser();
      this.dialog.closeAll();
      Swal.fire(
        'Listo!',
        'Su cuenta se ha creado y ahora podras solicitar un prestamo!',
        'success'
      )
    } catch (error) {
      console.log(error);
      Swal.close();
      Swal.fire(
        'Lo sentimos',
        'Ha ocurrido un error inesperado, intente de nuevo más tarde',
        'error'
      )

    }

  }

  openSignInDialog() {
    this.dialog.open(SignInFormComponent);
  }
}
