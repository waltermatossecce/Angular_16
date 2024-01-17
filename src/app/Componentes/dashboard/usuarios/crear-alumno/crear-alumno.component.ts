import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Modalidad } from 'src/app/models/modalidad';
import { AlumnoService } from 'src/app/service/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit{


  modalidad: Modalidad[] = [];


  //JSON para actualizar y registrar
  alumno: Alumno = { 
    id:0,
    nombre:"",
    apellido:"",
    email:"",
    sexo:"-1",
    dni:"",
    telefono:"",
    modalidad:{
      descripcion: "-1",
    }
  };
  //pero la modalidad no deberia estar vinculado?
  
  sexo: string[] = ["Masculino","Femenino"];
  formsRegistra:FormGroup;


 constructor(private fb:FormBuilder,private alumnoService:AlumnoService,
  private activatedRoute:ActivatedRoute){
  this.formsRegistra = this.fb.group({
    validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaApellido: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]],
    validaEmail: ['', [Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9@.]{3,30}')]],
    validadSexo:['',[Validators.required]],
    validaDni: ['', [Validators.required,Validators.pattern('[0-9]{8}')]],
    validaTelefono: ['', [Validators.required,Validators.pattern('9[0-9]{8}')]],
    //validaFechaNacimiento:['',[Validators.required]],
    validaModalidad: ['', [Validators.min(1)]],
 })
   this.alumnoService.getModalidad().subscribe(
    response=>this.modalidad = response
   );

 }

 ngOnInit(): void {
    this.cargarAlumnos();
 }

 guardaAlumno(): void {
  console.log(this.formsRegistra.value);

  this.alumnoService.creaAlumno(this.formsRegistra.value).subscribe(
     alumno => {
        this.alumno = alumno;
        Swal.fire('Nuevo alumno', `Alumno ${alumno.nombre} creado con éxito`, 'success');
     },
  );
}
 cargarAlumnos():void{
  this.activatedRoute.params.subscribe(params=>{
    let id =params['id']
    if(id){
      this.alumnoService.getAlumnos(id).subscribe((alumno)=>this.alumno=alumno
      )}
  });

 }

 update(alumno:Alumno):void{
    this.alumnoService.updateAlumno(alumno).subscribe(x => {
         
         Swal.fire('Alumno actualizado',`Alumno ${x.id} ${x.nombre} atualizado con éxito!`,'success')
         x=this.alumno=x;
      }
    )
    }

}

