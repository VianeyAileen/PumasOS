import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

// Importando modelos
import { Producto } from '../_modelos/productoModelo';
import { Imagen } from '../_modelos/imagenModelo';
import { Comprador } from '../_modelos/compradorModelo';
import { Comentario } from '../_modelos/comentarioModelo';
import { Calificacion } from '../_modelos/calificacionModelo';

// Importando Servicios
import { productoService } from '../_services/productoService';
import { imagenService } from '../_services/imagenService';
import { compradorService } from '../_services/compradorService';
import { comentarioService } from '../_services/comentarioService';
import { calificacionService } from '../_services/calificacionService';


@Component({
  selector: 'app-producto-comprador',
  templateUrl: './producto-comprador.component.html',
  styleUrls: ['./producto-comprador.component.css']
})
export class ProductoCompradorComponent implements OnInit {

  id : number|any;
  nombre : string |any;
  correo : string | any;

  productos: Producto[] = [];
  imagenes : Imagen[] = [];
  comprador : Comprador = {correo: "",nombre: "",apellidos: "",contrasena: "",nombreUsuario: ""};
  comentarios: Comentario[] = [];
  calificaciones : Calificacion[] = [];

  constructor(
    private _router: Router,
    private productoService : productoService,
    private imagenService : imagenService,
    private compradorService : compradorService,
    private comentarioService : comentarioService,
    private calificacionService : calificacionService,
    private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
     //  Asignamos el id y el nombre
     this.id = this.rutaActiva.snapshot.paramMap.get('id');
     this.nombre = this.rutaActiva.snapshot.paramMap.get('nombre');
     this.correo = this.rutaActiva.snapshot.paramMap.get('correo');
 
     // Buscamos el producto
     this.productoService.obtenerProducto(this.nombre).subscribe(data => {
       this.productos = data;
     });
 
     // Buscamos el vendedor
     this.compradorService.obtenerComprador(this.correo).subscribe(data2 => {
       this.comprador = data2;
     });
 
     // Buscamos las imagenes
     this.imagenService.obtenerImagenes(this.id).subscribe(data3 => {
       this.imagenes = data3;
     });
 
     //  Buscamos los comentarios
     this.comentarioService.obtenerComentarios(this.id).subscribe(data4 => {
       this.comentarios = data4;
     })
 
     //  Obtenemos las calificaciones
     this.calificacionService.obtenerCalificaciones(this.id).subscribe(data5 => {
       this.calificaciones = data5;
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
         this._router.navigate(["/"]);
        Swal.fire(
          'Sesión Cerrada',
          'Acción realizada con éxito',
          'success'
        )
      } else if (result.dismiss == Swal.DismissReason.cancel){
         this._router.navigate(["/informacionComprador"])
      } 
    })
  }
}
