import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiServerUrl= 'https://potfolioapgrhk.herokuapp.com/';
  
  constructor(private http: HttpClient) { }

  public getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiServerUrl}/profile/allprofile`);
  }

  public updateProfile(profile: Profile): Observable<Profile>{
    return this.http.put<Profile>(`${this.apiServerUrl}/profile/edit/1`, profile);
  }
}
