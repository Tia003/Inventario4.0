import { MessagesService } from 'src/app/services/Messages/messages.service';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private messages: MessagesService,
    private formBuilder: FormBuilder,
  ) { }

  email: any;
  password: any;
  hide = true;
  submitted: boolean = false

  loginForm = this.formBuilder.group(
    {
      Email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])],
      Password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#.$^+=!*()@%&]).{8,}$')])],
  });

  get f2() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.auth.showMenu = false
  }

  //LOGIN

  login(){
    this.submitted = true
    this.email = this.loginForm.controls["Email"].value;
    this.password = this.loginForm.controls["Password"].value;

    if (this.loginForm.valid && this.loginForm.controls) {
      this.auth.login(this.email, this.password)
    }else{
      this.messages.openSnackBar("Inserire email e password", true);
    }
  }


  //LOGIN WITH GOOGLE

  signInWithGoogle(){
    this.auth.singInWithGoogle()
  }
}
