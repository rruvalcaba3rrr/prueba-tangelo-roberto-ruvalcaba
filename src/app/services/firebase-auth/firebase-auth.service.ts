import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Client } from 'src/app/models/client';
import { first } from 'rxjs/operators';
import { Loan } from 'src/app/models/loan';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  logOutUser(): Promise<any> {
    return this.afAuth.signOut();
  }

  async currentuser(userId:string) {
    var user = await this.afs.collection('clients').doc(userId).ref.get();
    return user.data();
    
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async createClient(client: Client, clientUid: string) {
    try {
      var resp = await this.afs.collection('clients').doc(clientUid).set(client);
      return resp;
    } catch (error) {
      throw error;
    }
  }
  async createLoan(loanInfo: Loan) {
    try {
      var resp = await this.afs.collection('loans').add(loanInfo);
      return resp;
    } catch (error) {
      throw error;
    }
  }
}
