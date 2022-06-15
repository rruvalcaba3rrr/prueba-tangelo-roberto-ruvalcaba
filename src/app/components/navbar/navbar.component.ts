import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private dialogRef: MatDialog) {}

  ngOnInit(): void {}

  openDialog(type: string | 'sign-in' | 'sign-up') {
    if (type == 'sign-in') {
      this.dialogRef.open(SignInFormComponent);
    }
    if (type == 'sign-up') {
      this.dialogRef.open(SignUpFormComponent);
    }
  }
}
