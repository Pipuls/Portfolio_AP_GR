import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loginuser } from 'src/app/models/security/loginuser';
import { AuthService } from 'src/app/services/security/auth.service';
import { TokenService } from 'src/app/services/security/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLogginFail = false;
  loginUser!: Loginuser
  userName!: string;
  password!: string;
  roles: string[] = [];
  errMsg!: string;

  constructor( 
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUser = new Loginuser(this.userName, this.password); 
      this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.isLogginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate([''])
      }, 
      err => {
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsg = err.error.message;
        console.log(this.errMsg);
      }
    );
  }

}
