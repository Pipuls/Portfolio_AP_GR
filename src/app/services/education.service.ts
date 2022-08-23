import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/education';


@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiServerUrl= 'https://apportfoliogr.herokuapp.com';
  
  constructor(private http: HttpClient) { }

  public getEducations(): Observable<Education[]>{
    return this.http.get<Education[]>(`${this.apiServerUrl}/education/alledu`);
  }

  public addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(`${this.apiServerUrl}/education/addedu`, education);
  }

  public updateEducation(education: Education): Observable<Education>{
    return this.http.put<Education>(`${this.apiServerUrl}/education/editedu/{id}`, education);
  }

  public deleteEducation(educationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/education/deleteedu/${educationId}`);
  }
}
