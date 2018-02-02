import { ViewContainerRef } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { RegisterData } from './../../models/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerData = new RegisterData();
  constructor(public router: Router, public auth: AuthService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  redirectToLogin() {
    this.router.navigate(['Login']);
  }
  userRegister() {
    let message = '';
    if (this.registerData.username === ''
      || this.registerData.password === '' || this.registerData.repassword === '') {
      message = 'A Field is empty';
    } else if (this.registerData.password !== this.registerData.repassword) {
      message = 'Passwords don\'t match';
    } else {
      this.auth.userRegister(this.registerData.username,
        this.registerData.password,
        this.registerData.repassword).subscribe((data) => {
          if (data.success) {
            this.redirectToLogin();
          } else {
            message = "Username already taken!";
          }
        });
    }
    this.toastr.warning(message, 'Alert!');

  }

  testForToast() {
    this.toastr.warning('A Field is empty', 'Alert!');
  }
}
