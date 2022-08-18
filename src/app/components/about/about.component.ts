import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
public abouts!: About[];
public editAbout!: About;

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    this.getAbouts();
  }
  getAbouts(): void{
    this.aboutService.getAbouts().subscribe(
      (response: About[]) => {
        this.abouts = response;
        console.log(this.abouts);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public onUpdateAbout(about: About):void {
    this.aboutService.updateAbout(about).subscribe(
      (response: About) => {
        console.log(response);
        this.getAbouts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onOpenModal(about: About, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'editAbout'){
      this.editAbout = about;  
      button.setAttribute('data-target', '#updateAboutModal');
    }
    container?.appendChild(button);
    button.click();
  }
}