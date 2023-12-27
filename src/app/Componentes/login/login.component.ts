import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  form:FormGroup;
  loading:boolean=false;

  constructor(private fb:FormBuilder,private _snackBar: MatSnackBar,
    private router:Router){
      this.form = this.fb.group({
        validaUsuario: ['', [Validators.required/*, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')*/]],
        validaPassword: ['',Validators.required /*,Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')*/]
  })
}

   ngOnInit(): void {
   }

   ingresar():void{
    const usuario = this.form.value.validaUsuario;
    const password = this.form.value.validaPassword;

    if(usuario == 'walter' && password=="walter123"){
      //redirecioamos al dashboard
       this.fakeLoading();
    }
    else{
      //mostramos un mensaje de error
      this.error();
      this.form.reset();
    }
   }

   error():void{
    this._snackBar.open('Usuario y contraseña ingresados son invalidos','',{
     verticalPosition:'bottom',
     horizontalPosition:'center',
     duration:5000
    })
   }

   fakeLoading(){
     this.loading=true
    setTimeout(() => {
      //Redireccionamos al dashboard
      this.router.navigate(['/dashboard'])
    }, 3000);
   }
   
}