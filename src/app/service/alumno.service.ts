import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient) { }

  public url:string="http://localhost:8090/api/alumnos";

  getAlumno(): Observable<Alumno[]>{
   return this.http.get<Alumno[]>(this.url);
  }
  creaAlumno(alumno:Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.url,alumno);
  }
  getAlumnos(id:number):Observable<Alumno>{0
    return this.http.get<Alumno>(`${this.url}/${id}`)
  }
  updateAlumno(alumno:Alumno):Observable<Alumno>{
    return this.http.put<Alumno>(`${this.url}/${alumno.id}`,alumno)
  }
  delete(id:number):Observable<Alumno>{
    return this.http.delete<Alumno>(`${this.url}/${id}`)
  }

}
