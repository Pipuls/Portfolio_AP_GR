import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { TokenService } from 'src/app/services/security/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public profiles!: Profile[];
public editProfile!: Profile;
roles!: string[];
isAdmin = false

  constructor(
    private profileService: ProfileService,
    private tokenService: TokenService,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.getProfiles();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol =>{
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(
      (response: Profile[]) => {
        this.profiles = response;
        console.log(this.profiles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateProfile(profile: Profile): void{
    this.profileService.updateProfile(profile).subscribe(
      (response: Profile) => {
        console.log(response);
        this.toast.info({detail:"Edición:", summary: "El perfil se actualizó correctamente", duration: 3000});
        this.getProfiles();

      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Error:", summary: "Ocurrió un error al actualizar el perfil", duration: 3000});
        
      }
    );
  }

  public onOpenModal(profile: Profile, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'editImg'){
      this.editProfile = profile;  
      button.setAttribute('data-target', '#editImgProfileModal');
    }
    if (mode === 'editNA') {
      this.editProfile = profile;
      button.setAttribute('data-target', '#editNAProfileModal');
    }
    if (mode === 'editPP') {
      this.editProfile = profile;
      button.setAttribute('data-target', '#editPPProfileModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
