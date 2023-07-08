import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { MessagesService } from '../services/Messages/messages.service';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private messages: MessagesService,
  ) { }

  showMenu: boolean = true
  infoUser: any
  username: any
  user: any

  //USER

  getUserInfo() {
    this.user = this.fireAuth.user;
    console.log(this.user)
  }

  //LOGIN

  login(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then( (res: any) => {

      if (res.user?.emailVerified == true) {
        this.infoUser = res
        localStorage.setItem('token', 'true')
        this.username = email
        this.showMenu = true
        this.router.navigate(['componenti'])
        this.messages.openSnackBar("Accesso effettuato", false);
      }else{
        this.messages.openSnackBar("Account non ancora verificato", true);
      }

    }, (error: any) => {
      this.messages.openSnackBar("Impossibile effettuare l'accesso", true);
      this.router.navigate(['/login'])
    })
  }


  //REGISTER

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then( (res: any) => {
      this.showMenu = true;
      this.username = email
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    }).catch((error: any) => {
      ////console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        this.messages.openSnackBar("Questo indirizzo email è già in uso", true);
      }else{
        this.messages.openSnackBar("Impossibile effettuare la registrazione", true);
        this.router.navigate(['/register']);
      }
    });
  }



  //LOGOUT

  logout(){
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('token')
      localStorage.removeItem('logged')
      this.username = ''
      this.showMenu = false
      this.router.navigate(['/login'])
    }, (error: any) => {
      this.messages.openSnackBar("Impossibile effettuare il logout", true);
    })
  }


  //FORGOT-PASSWORD

  forgotPassword(email: string){
    this.fireAuth.sendPasswordResetEmail(email).then( () => {
      this.messages.openSnackBar("Riceverai una email per il reset della password, controlla la tua posta elettronica", false);
      this.router.navigate(['/login'])
    }, (error: any) => {
      this.messages.openSnackBar("Impossibile effettuare il reset della password", true);
    })
  }



  //SEND VERIFICATION AFTHER REGISTER

  sendEmailForVerification(user: any){
    user.sendEmailVerification().then( (res: any) => {
      this.messages.openSnackBar("Riceverai una email per confermare la tua registrazione, controlla la tua posta elettronica", false);
    }, (error: any) => {
      this.messages.openSnackBar("Impossibile effettuare la registrazione", true);
    })
  }


  //SIGN IN WITH GOOGLE

  singInWithGoogle(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then( (res: any) => {
      this.infoUser = res
      this.showMenu = true
      this.username = res.user.multiFactor.user.email
      this.router.navigate(['componenti'])
      this.messages.openSnackBar("Accesso effettuato", false);
      localStorage.setItem('token', JSON.stringify(res.user?.uid))

    }, (error: any) => {
      this.messages.openSnackBar("Impossibile effettuare l'accesso con Google", true);
    })
  }
}
