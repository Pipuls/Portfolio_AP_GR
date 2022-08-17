import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EducationComponent } from './components/education/education.component';
import { XperienceComponent } from './components/xperience/xperience.component';
import { EducationService } from './services/education.service';
import { XperienceService } from './services/xperience.service';
import { SkilComponent } from './components/skil/skil.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    EducationComponent,
    XperienceComponent,
    SkilComponent,
    ProjectsComponent,
    FooterComponent,
    AboutComponent,
    NavbarComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({
      radius:50,
      outerStrokeWidth:5,
      innerStrokeWidth:3,
      innerStrokeColor:"#f8b6a3",
      animation:true,
      animationDuration:1500,
      responsive:true,
      showImage:true,
      imageHeight:40,
      imageWidth:40
    }),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    EducationService,
    XperienceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
