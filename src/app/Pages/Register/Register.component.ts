import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/Messages/messages.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private messages: MessagesService,
    private formBuilder: FormBuilder,
  ) { }

  email: any;
  password: any;
  hide = true;
  submitted: boolean = false

  registerForm = this.formBuilder.group(
    {
      Email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$')])],
      Password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#.$^+=!*()@%&]).{8,}$')])],
  });

  get f2() {
    return this.registerForm.controls;
  }

  ngOnInit() {
  }


  //LOGIN

  register(){
    this.submitted = true
    this.email = this.registerForm.controls["Email"].value;
    this.password = this.registerForm.controls["Password"].value;

    if (this.registerForm.valid && this.registerForm.controls) {
      this.auth.register(this.email, this.password)
    }else{
      this.messages.openSnackBar("Inserire email e password", true);
    }
  }

}
