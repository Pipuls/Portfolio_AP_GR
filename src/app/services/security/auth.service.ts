import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from 'src/app/models/security/jwt-dto';
import { Loginuser } from 'src/app/models/security/loginuser';
import { Newuser } from 'src/app/models/security/newuser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl= 'https://potfolioapgrhk.herokuapp.com';

  constructor(private http: HttpClient) { }

  public new(newUser: Newuser): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/auth/new`, newUser)
  }

  public login(loginUser: Loginuser): Observable<JwtDto> {
    return this.http.post<JwtDto>(`${this.apiServerUrl}/auth/login`, loginUser)
  }
}
