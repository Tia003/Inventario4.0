import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './Pages/Overview/Overview.component';
import { ComponentiComponent } from './Pages/Componenti/Componenti.component';
import { LoginComponent } from './Pages/Login/Login.component';
import { RegisterComponent } from './Pages/Register/Register.component';
import { ForgotPasswordComponent } from './Pages/forgotPassword/forgotPassword.component';

const routes: Routes = [
  { path: '',  component: LoginComponent}, // reindirizza alla homepage quando si accede alla radice dell'app
  { path: 'login', component: LoginComponent},
  { path: 'overview', component: OverviewComponent },
  { path: 'componenti', component: ComponentiComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
