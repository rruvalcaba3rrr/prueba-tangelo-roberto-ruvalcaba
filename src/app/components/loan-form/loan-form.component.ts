import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {

  public amountSelected: number = 3500;
  options: Options = {
    floor: 1000,
    ceil: 5000
  };
  constructor(private fb_service: FirebaseAuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async requestLoan() {
    var userActive = await this.fb_service.isLoggedIn();
    if (userActive == undefined) {
      this.dialog.open(SignUpFormComponent);
      return;
    }

  }
}
