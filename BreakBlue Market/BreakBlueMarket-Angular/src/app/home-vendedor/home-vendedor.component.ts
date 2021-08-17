import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { productoService } from '../_services/productoService';
import { Producto } from '../_modelos/productoModelo';
import { Imagen } from '../_modelos/imagenModelo';

import Swal from 'sweetalert2'
import { Observable, Subscriber } from 'rxjs';
import { imagenService } from '../_services/imagenService';

@Component({
  selector: 'app-home-vendedor',
  templateUrl: './home-vendedor.component.html',
  styleUrls: ['./home-vendedor.component.css']
})
export class HomeVendedorComponent implements OnInit {

  previsualizacion : string | any;
  productos : Producto[] = [];
  // imagen : Observable<any> | undefined;
  nombre : String| any;

  correo : string | any;

  constructor(
    private _router: Router,
    private productoService : productoService,
    private imagenService : imagenService,
    private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.correo = this.activateRoute.snapshot.paramMap.get('correo');
    this.productoService.obtenerProductos().subscribe( data => {
      this.productos = data;
    })
  }

  obtenerImagen(imagen : String){
    this.onSelectFile(imagen);
    return true;
  }

  mensajeCerrar(){
    Swal.fire({
      text: "¿Está seguro de querer cerrar la sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
         this._router.navigate(["/"]);
        Swal.fire(
          'Sesión Cerrada',
          'Acción realizada con éxito',
          'success'
        )
      } else if (result.dismiss == Swal.DismissReason.cancel){
         this._router.navigate(["/homeVendedor"])
      } 
    })
  }

   // Función para subir una imagen
   onSelectFile(event : Event|any) : any{
    console.log(event)
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then( (imagen : any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    })
  }
  

  extraerBase64 = async ($event : any) => new Promise((resolve, reject) => {
    try{
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base : reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base : null
        });
      };
    }catch(e){
      reject ;
    }
  })
}
