import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import Swal from 'sweetalert2';
import { Client } from 'src/app/models/client';
import { Loan } from 'src/app/models/loan';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss'],
})
export class LoanFormComponent implements OnInit {
  public minDatePicker: Date = new Date();
  public amountSelected: number = 3500;
  public dateSelected!: Date | null;
  public options: Options = {
    floor: 1000,
    ceil: 10000,
  };
  public currentStep: number = 1;
  public clientInfo!: Client;
  constructor(
    private fb_service: FirebaseAuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  random() {
    return Math.floor(Math.random() * (25 - 1 + 1) + 1);
  }
  async validateUser() {
    var userActive = await this.fb_service.isLoggedIn();
    if (userActive == undefined) {
      this.dialog.open(SignUpFormComponent);
      return;
    }
    var response: any = await this.fb_service.currentuser(userActive.uid);
    this.clientInfo = {
      uid: response.uid,
      cedula: response.cedula,
      name: response.name,
      email: response.email,
    };
    this.currentStep = 2;
  }

  async requestLoan() {
    try {
      Swal.fire('Verificando información', 'Espere un momento...', 'info');
      Swal.showLoading();
      if (this.random() < 10) {
        this.currentStep = 1;
        Swal.close();
        Swal.fire(
          'Lo sentimos',
          'Por el momento no podemos ofrecerte un préstamo ya que no cumples con los requisitos solicitados.',
          'error'
        );
        return;
      }
      var loan: Loan = {
        clientUid: this.clientInfo.uid,
        clientEmail: this.clientInfo.email,
        clientName: this.clientInfo.name,
        amount: this.amountSelected,
        status: 1,
        paymentDate:
          this.dateSelected == undefined ? new Date() : this.dateSelected,
      };
      await this.fb_service.createLoan(loan);
      this.currentStep = 1;
      this.amountSelected = 3500;
      Swal.close();
      Swal.fire('Listo!', 'Su prestamo se ha aprobado', 'success');
    } catch (error) {
      console.log(error);
    }
  }
}
