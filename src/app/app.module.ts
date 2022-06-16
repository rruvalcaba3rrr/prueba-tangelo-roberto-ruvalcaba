import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
//Firebase
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

//Material module
import { MaterialModule } from './material.module';
//Extras
import { NgxSliderModule } from '@angular-slider/ngx-slider';
//Components
import { ClientSiteComponent } from './public/client-site/client-site.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { SignInAdminComponent } from './private/sign-in-admin/sign-in-admin.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
@NgModule({
  declarations: [
    AppComponent,
    ClientSiteComponent,
    NavbarComponent,
    LoanFormComponent,
    DashboardComponent,
    SignInAdminComponent,
    NavbarAdminComponent,
    SignUpFormComponent,
    SignInFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxSliderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
