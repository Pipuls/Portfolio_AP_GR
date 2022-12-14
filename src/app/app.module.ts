import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//ruteo
import { AppRoutingModule } from './app-routing.module';
//componentes
import { AppComponent } from './app.component';
import { EducationComponent } from './components/education/education.component';
import { XperienceComponent } from './components/xperience/xperience.component';
import { EducationService } from './services/education.service';
import { XperienceService } from './services/xperience.service';
import { SkilService } from './services/skil.service';
import { SkilComponent } from './components/skil/skil.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { HomeComponent } from './components/home/home.component';
//servicios seguridad
import { InterceptorService } from './services/security/interceptor.service';
import { AuthService } from './services/security/auth.service';
//external toast
import { NgToastModule } from 'ng-angular-popup'
// barra de progreso circular
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ContactComponent } from './components/contact/contact.component';




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
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
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
    XperienceService,
    SkilService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
