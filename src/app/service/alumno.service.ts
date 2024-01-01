import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http:HttpClient,private router:Router) { }

  public url:string="http://localhost:8090/api/alumnos";

  getAlumno(): Observable<Alumno[]>{
   return this.http.get<Alumno[]>(this.url);
  }
  creaAlumno(alumno:Alumno):Observable<Alumno>{
    return this.http.post<Alumno>(this.url,alumno);
  }
  getAlumnos(id:number):Observable<Alumno>{0
    return this.http.get<Alumno>(`${this.url}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/dashboard/usuarios'])
        console.log(e.error.mensaje);
        Swal.fire('Error al editar',e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }
  updateAlumno(alumno:Alumno):Observable<Alumno>{
    return this.http.put<Alumno>(`${this.url}/${alumno.id}`,alumno)
  }
  delete(id:number):Observable<Alumno>{
    return this.http.delete<Alumno>(`${this.url}/${id}`)
  }

  
}
