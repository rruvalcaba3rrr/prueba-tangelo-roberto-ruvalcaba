import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { SignInAdminComponent } from './private/sign-in-admin/sign-in-admin.component';
import { ClientSiteComponent } from './public/client-site/client-site.component';
import { AdminAuthGuard } from './services/admin-auth/admin-auth.guard';

const routes: Routes = [
  { path: '', component: ClientSiteComponent },
  {
    path: 'adminpanel',
    component: SignInAdminComponent,
  },
  {
    path: 'adminpanel/dashboard',
    canActivate: [AdminAuthGuard],
    component: DashboardComponent,
  },
  {  path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
