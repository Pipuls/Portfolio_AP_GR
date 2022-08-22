import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Xperience } from 'src/app/models/xperience';
import { TokenService } from 'src/app/services/security/token.service';
import { XperienceService } from 'src/app/services/xperience.service';

@Component({
  selector: 'app-xperience',
  templateUrl: './xperience.component.html',
  styleUrls: ['./xperience.component.css']
})
export class XperienceComponent implements OnInit {
public xperiences!: Xperience[];
public editXperience!: Xperience;
public deleteXperience!: Xperience;
roles!: string[];
isAdmin = false

  constructor(
    private xperienceService: XperienceService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getXperiences();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol =>{
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  getXperiences(): void {
    this.xperienceService.getXperiences().subscribe(
      (response: Xperience[]) => {
        this.xperiences = response;
        console.log(this.xperiences);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onAddXperience(addForm: NgForm): void {
    document.getElementById('add-xperience-form')?.click();
    this.xperienceService.addXperience(addForm.value).subscribe(
      (response: Xperience) => {
        console.log(response);
        this.getXperiences();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateXperience(xperience: Xperience): void {
    this.xperienceService.updateXperience(xperience).subscribe(
      (response: Xperience) => {
        console.log(response);
        this.getXperiences();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteXperience(xperienceId: number): void {
    this.xperienceService.deleteXperience(xperienceId).subscribe(
      (response: void) => {
        console.log(response);
        this.getXperiences();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(xperience: Xperience, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addXperienceModal');
    }
    if (mode === 'edit') {
      this.editXperience = xperience;
      button.setAttribute('data-target', '#updateXperienceModal');
    }
    if (mode === 'delete') {
      this.deleteXperience = xperience;
      button.setAttribute('data-target', '#deleteXperienceModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
