import { WebSocketService } from './../../services/web-socket.service';
import { LoginData } from './../../models/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, public auth: AuthService, public tokenService: TokenService, public webSocketService: WebSocketService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  loginData = new LoginData();
  ngOnInit() {
  }

  redirectToRegister() {
    this.router.navigate(['Register']);
  }

  redirectToChats() {
    this.router.navigate(['Chats']);
  }
  userLogin() {
    let message = '';
    if (this.loginData.username === '' || this.loginData.password === '') {
      message = 'Username or Password is empty';
      this.toastr.warning(message, 'Alert!');
    } else {

      this.auth.userLogin(this.loginData.username, this.loginData.password).subscribe((data) => {
        if (data.success) {
          message = 'Succeded';
          console.log("asdf");
          this.tokenService.setToken(data.token);
          this.webSocketService.connect();
          this.redirectToChats();
        } else {
          message = 'Something went wrong!'
        }
        this.toastr.warning(message, 'Alert!');
      });

    }

  }

}
