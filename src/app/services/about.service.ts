import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { About } from '../models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiServerUrl= 'https://portfolioberw-production.up.railway.app';

  constructor(private http: HttpClient) { }

  public getAbouts(): Observable<About[]>{
    return this.http.get<About[]>(`${this.apiServerUrl}/about/allabout`);
  }
  public updateAbout(about: About): Observable<About>{
    return this.http.put<About>(`${this.apiServerUrl}/about/edit/1`, about);
  }
}
