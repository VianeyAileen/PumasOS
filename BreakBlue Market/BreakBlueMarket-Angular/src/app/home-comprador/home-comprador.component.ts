import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { productoService } from '../_services/productoService';
import { imagenService } from '../_services/imagenService';
import { Producto } from '../_modelos/productoModelo';

import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { compradorService } from '../_services/compradorService';

@Component({
  selector: 'app-home-comprador',
  templateUrl: './home-comprador.component.html',
  styleUrls: ['./home-comprador.component.css']
})
export class HomeCompradorComponent implements OnInit {

  productos : Producto[] = [];
  imagen : Observable<any> | undefined;
  nombre : String | any;

  searchForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private productoService : productoService,
    private compradorService : compradorService,
    private imagenService: imagenService) {
      this.createForm();
     }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe( data => {
      this.productos = data;
    })
  }

  createForm() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
  });
  }


  submit(){
    let search = this.searchForm.value.search;
    if(search){
      this.productoService.obtenerProducto(search).subscribe(data => {
        if(data[0]){
          this._router.navigate(['/informacionComprador',data[0].id, data[0].nombre, data[0].correo]);
        }else{
          Swal.fire(
            'No se encontro el producto',
            'Ninguna coincidencia en la base de datos'
          )
        }
      })
    }
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
