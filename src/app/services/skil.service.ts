import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skils } from '../models/skils';

@Injectable({
  providedIn: 'root'
})
export class SkilService {
  private apiServerUrl= 'https://potfolioapgrhk.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getSkils(): Observable<Skils[]>{
    return this.http.get<Skils[]>(`${this.apiServerUrl}/skil/allskils`);
  }

  public addSkil(xperience: Skils): Observable<Skils> {
    return this.http.post<Skils>(`${this.apiServerUrl}/skil/addskils`, xperience);
  }

  public updateSkil(xperience: Skils): Observable<Skils>{
    return this.http.put<Skils>(`${this.apiServerUrl}/skil/editskils/{id}`, xperience);
  }

  public deleteSkil(xperienceId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/skil/deleteskils/${xperienceId}`);
  }
}
