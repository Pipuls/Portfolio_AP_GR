import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public profiles!: Profile[];
public editProfile!: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getProfiles();
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
        this.getProfiles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
