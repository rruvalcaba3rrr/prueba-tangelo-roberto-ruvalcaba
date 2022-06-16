import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
})
export class NavbarAdminComponent implements OnInit {
  constructor(private fb_service: FirebaseAuthService, public router: Router) {}

  ngOnInit(): void {}
  logOutSesion() {
    this.fb_service.logOutUser();
    this.router.navigate(['/adminpanel']);
  }
}
