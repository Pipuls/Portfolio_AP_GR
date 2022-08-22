import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/security/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public educations!: Education[];
  public editEducation!: Education;
  public deleteEducation!: Education;
  isLogged = false;

  constructor(
    private educationService: EducationService,
    private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getEducations();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getEducations(): void {
    this.educationService.getEducations().subscribe(
      (response: Education[]) => {
        this.educations = response;
        console.log(this.educations)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEducation(addForm: NgForm): void {
    document.getElementById('add-education-form')?.click();
    this.educationService.addEducation(addForm.value).subscribe(
      (response: Education) => {
        console.log(response);
        this.getEducations();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateEducation(education: Education): void {
    this.educationService.updateEducation(education).subscribe(
      (response: Education) => {
        console.log(response);
        this.getEducations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public onDeleteEducation(educationId: number): void {
    this.educationService.deleteEducation(educationId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEducations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(education: Education, mode: String): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducationModal');
    }
    if (mode === 'edit') {
      this.editEducation = education;
      button.setAttribute('data-target', '#updateEducationModal');
    }
    if (mode === 'delete') {
      this.deleteEducation = education;
      button.setAttribute('data-target', '#deleteEducationModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
