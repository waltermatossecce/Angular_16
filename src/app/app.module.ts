import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Componentes/login/login.component'
import { SharedModule } from './Componentes/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { CrearAlumnoComponent } from './usuarios/crear-alumno/crear-alumno.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearAlumnoComponent
    
    
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
