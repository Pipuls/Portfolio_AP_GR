import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Xperience } from '../models/xperience';

@Injectable({
  providedIn: 'root'
})
export class XperienceService {

  private apiServerUrl= 'https://portfolioapbe.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getXperiences(): Observable<Xperience[]>{
    return this.http.get<Xperience[]>(`${this.apiServerUrl}/xperience/allxp`);
  }

  public addXperience(xperience: Xperience): Observable<Xperience> {
    return this.http.post<Xperience>(`${this.apiServerUrl}/xperience/addxp`, xperience);
  }

  public updateXperience(xperience: Xperience): Observable<Xperience>{
    return this.http.put<Xperience>(`${this.apiServerUrl}/xperience/editxp/{id}`, xperience);
  }

  public deleteXperience(xperienceId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/xperience/deletexp/${xperienceId}`);
  }
}
