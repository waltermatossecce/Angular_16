import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Alumno } from 'src/app/models/alumno';
import { AlumnoService } from 'src/app/service/alumno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit {

  alumno:Alumno[];

  displayedColumns: string[] = ['id','nombre','apellido','email','sexo','dni','telefono','acciones'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Alumno>();
  constructor(private _alumnoService:AlumnoService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
    this._alumnoService.getAlumno().subscribe(alumno=>{ 
      this.dataSource.data = alumno;
      }
    );
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  EliminarAlumno(alumno: Alumno): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: `¿Seguro que desea eliminar al cliente ${alumno.id} ${alumno.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "No, cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._alumnoService.delete(alumno.id).subscribe(
          (alu) => {
            // Filtra y actualiza la fuente de datos de la tabla
            this.dataSource.data = this.dataSource.data.filter((alu) => alu !== alumno);
  
            Swal.fire({
              title: "Alumno Eliminado",
              text: `Alumno ${alumno.nombre} eliminado con éxito`,
              icon: "success"
            });
          },
          (error) => {
            console.error("Error al eliminar el alumno:", error);
          }
        );
      } else {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "La eliminación ha sido cancelada",
          icon: "error"
        });
      }
    });
  }
  
}
