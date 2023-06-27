import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService) { }

  infoUser: any

  ngOnInit() {
    this.infoUser = this.authService.getUserInfo()
    console.log(this.infoUser)
  }



  ngAfterContentInit(): void {
  }

}
