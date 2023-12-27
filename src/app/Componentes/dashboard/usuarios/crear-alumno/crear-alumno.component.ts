import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/service/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit{

  alumno: Alumno = { 
    id:0,
    nombre:"",
    apellido:"",
    email:"",
    sexo:"-1",
    dni:"",
    telefono:""
  };
  sexo: string[] = ["Masculino","Femenino"];
  form:FormGroup;


 constructor(private fb:FormBuilder,private alumnoService:AlumnoService,
  private activatedRoute:ActivatedRoute){
  this.form = this.fb.group({
    validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaApellido: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaEmail: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9@.]{3,30}')]],
    validadSexo:['',[Validators.required]],
    validaDni: ['', [Validators.required,Validators.pattern('[0-9]{8}')]],
    validaTelefono: ['', [Validators.required,Validators.pattern('9[0-9]{8}')]]
 })
 }

 ngOnInit(): void {
    this.cargarAlumnos();
 }

 guardaAlumno():void{
  this.alumnoService.creaAlumno(this.alumno).subscribe(
    alumno => {
      this.alumno = alumno
      Swal.fire('Nuevo alumno',`Alumno ${alumno.id} ${alumno.nombre} creado con éxito`, 'success')
    }
  )
 }
 cargarAlumnos():void{
  this.activatedRoute.params.subscribe(params=>{
    let id =params['id']
    if(id){
      this.alumnoService.getAlumnos(id).subscribe(
        (alumno)=>this.alumno=alumno
      )
    }
  })
 }

 update(alumno:Alumno):void{
    this.alumnoService.updateAlumno(alumno).subscribe(x => {
         
         Swal.fire('Alumno actualizado',`Alumno ${x.id} ${x.nombre} atualizado con éxito!`,'success')
         x=this.alumno=x;
      }
    )
 }


}

