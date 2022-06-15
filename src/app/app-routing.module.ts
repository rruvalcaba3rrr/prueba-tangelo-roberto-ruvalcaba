import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { SignInAdminComponent } from './private/sign-in-admin/sign-in-admin.component';
import { ClientSiteComponent } from './public/client-site/client-site.component';

const routes: Routes = [
  { path: '', component: ClientSiteComponent },
  {
    path: 'adminpanel',
    // canActivate: [AuthGuardService],
    component: SignInAdminComponent,
  },
  {
    path: 'adminpanel/dashboard',
    // canActivate: [AuthGuardService],
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
