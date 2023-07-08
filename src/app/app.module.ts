import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MessagesService } from './services/Messages/messages.service';


//COMPONENT

import { AppComponent } from './app.component';
import { OverviewComponent } from './Pages/Overview/Overview.component';
import { ComponentiComponent } from './Pages/Componenti/Componenti.component';
import { LoginComponent } from './Pages/Login/Login.component';
import { RegisterComponent } from './Pages/Register/Register.component';
import { ForgotPasswordComponent } from './Pages/forgotPassword/forgotPassword.component';
import { DialogAddComponenteComponent } from './services/DialogAddComponente/DialogAddComponente.component';
import { DialogAddFornituraComponent } from './services/DialogAddFornitura/DialogAddFornitura.component';
import { DialogConfirmComponent } from './services/DialogConfirm/DialogConfirm.component';
import { OTPVerificationComponent } from './Pages/OTP-Verification/OTP-Verification.component';

//ALTRO

import { AngularMaterialModule } from '../app/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

//FIREBASE

import { AngularFireModule } from '@angular/fire/compat'

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore'
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';


@NgModule({
  declarations: [
    AppComponent,
    ComponentiComponent,
    OverviewComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DialogAddComponenteComponent,
    DialogAddFornituraComponent,
    DialogConfirmComponent,
    OTPVerificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore())
  ],
  providers: [MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
