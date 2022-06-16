import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private fb_service: FirebaseAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return new Observable<boolean>((obs) => {
      this.auth.authState.subscribe((auth) => {
        if (!auth) {
          this.router.navigate(['/adminpanel']);
          obs.next(false);
        }
        if (auth?.uid != '8vqYF2eEGUdMLiTDfKuxhYeHDKk1') {
          this.fb_service.logOutUser();
          this.router.navigate(['/adminpanel']);
          obs.next(false);
        }
        obs.next(true);
      });
    });
  }
}
