import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { productoService } from '../_services/productoService';
import { compradorService } from '../_services/compradorService';
import { imagenService } from '../_services/imagenService';
import { Producto } from '../_modelos/productoModelo';
import { Imagen } from '../_modelos/imagenModelo';

import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-comprador',
  templateUrl: './home-comprador.component.html',
  styleUrls: ['./home-comprador.component.css']
})
export class HomeCompradorComponent implements OnInit {

  productos : Producto[] = [];
  imagen : Observable<any> | undefined;
  nombre : String | any;

  constructor(
    private _router: Router,
    private productoService : productoService,
    private compradorService: compradorService,
    private imagenService: imagenService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe( data => {
      this.productos = data;
    })
  }

  obtenerImagen(id : number){
    this.imagenService.obtenerImagenes(id).subscribe(data => {
      this.imagen = data.imagen;
    })
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
         this.compradorService.cerrarSesionComprador();
         console.log("verificacion de cerrar sesion")
         this._router.navigate(["/"]);
        Swal.fire(
          'Sesión Cerrada',
          'Acción realizada con éxito',
          'success'
        )
      } else if (result.dismiss == Swal.DismissReason.cancel){
         this._router.navigate(["/homeComprador"])
      }
    })
  }
}
