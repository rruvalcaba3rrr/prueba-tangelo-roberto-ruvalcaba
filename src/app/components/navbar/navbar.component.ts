import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public userInformation: any;
  public userActive: boolean = false;
  constructor(private dialogRef: MatDialog, private fb_service: FirebaseAuthService) { }

  ngOnInit(): void {
    this.fb_service.isLoggedIn().then(async (user) => {
      if (user?.uid) {
        var resp = await this.fb_service.currentuser(user?.uid!);
        this.userInformation = resp;
        this.userActive = true;
      }

    });
  }

  openDialog(type: string | 'sign-in' | 'sign-up') {
    if (type == 'sign-in') {
      this.dialogRef.open(SignInFormComponent);
    }
    if (type == 'sign-up') {
      this.dialogRef.open(SignUpFormComponent);
    }
  }

  logOutSesion() {
    this.fb_service.logOutUser();
    location.reload();
  }
}
