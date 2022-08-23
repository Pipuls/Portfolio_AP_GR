import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Skils } from 'src/app/models/skils';
import { TokenService } from 'src/app/services/security/token.service';
import { SkilService } from 'src/app/services/skil.service';

@Component({
  selector: 'app-skil',
  templateUrl: './skil.component.html',
  styleUrls: ['./skil.component.css']
})
export class SkilComponent implements OnInit {
  public skils!: Skils[];
  public editSkils!: Skils;
  public deleteSkil!: Skils;
  roles!: string[];
  isAdmin = false

  constructor(
    private skilService: SkilService,
    private tokenService: TokenService,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
    this.getSkils();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol =>{
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getSkils(): void {
    this.skilService.getSkils().subscribe(
      (response: Skils[]) => {
        this.skils = response;
        console.log(this.skils)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSkil(addForm: NgForm): void {
    document.getElementById('add-skils-form')?.click();
    this.skilService.addSkil(addForm.value).subscribe(
      (response: Skils) => {
        console.log(response);
        this.toast.success({detail:"Nueva Habilidad:", summary: "Agregada correctamente", duration: 3000});
        this.getSkils();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Nueva Habilidad:", summary: "Ocurrió un error al intentar agregar la habilidad", duration: 3000});
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateSkil(skils: Skils): void {
    this.skilService.updateSkil(skils).subscribe(
      (response: Skils) => {
        console.log(response);
        this.toast.info({detail:"Editar Habilidad:", summary: "Los cambios se guardaron correctamente", duration: 3000});
        this.getSkils();
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Editar Habilidad:", summary: "Ocurrió un error al intentar editar la habilidad", duration: 3000});
        alert(error.message);
      }
    );

  }

  public onDeleteSkil(skilsId: number): void {
    this.skilService.deleteSkil(skilsId).subscribe(
      (response: void) => {
        console.log(response);
        this.toast.warning({detail:"Eliminar Habilidad:", summary: "La habilidad a sido eliminada", duration: 3000});
        this.getSkils();
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Eliminar Habilidad:", summary: "Ocurrió un error al intentar eliminar la habilidad", duration: 3000});
        alert(error.message);
      }
    );
  }

  public onOpenModal(skils: Skils, mode: String): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSkilsModal');
    }
    if (mode === 'edit') {
      this.editSkils = skils;
      button.setAttribute('data-target', '#updateSkilsModal');
    }
    if (mode === 'delete') {
      this.deleteSkil = skils;
      button.setAttribute('data-target', '#deleteSkilsModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
