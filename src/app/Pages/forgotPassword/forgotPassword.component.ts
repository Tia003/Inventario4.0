import { MessagesService } from 'src/app/services/Messages/messages.service';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private messages: MessagesService,
    private formBuilder: FormBuilder,
  ) { }

  email: any;
  password: any;
  hide = true;
  submitted: boolean = false

  forgotForm = this.formBuilder.group(
    {
      Email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])
      ],
  });

  get f2() {
    return this.forgotForm.controls;
  }

  ngOnInit() {
    this.auth.showMenu = false
  }

  //LOGIN

  forgotPassword(){
    this.submitted = true
    this.email = this.forgotForm.controls["Email"].value;

    if (this.forgotForm.valid && this.forgotForm.controls) {
      this.auth.forgotPassword(this.email)
    }else{
      this.messages.openSnackBar("Inserire email e password", true);
    }
  }


}
