import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { productoService } from '../_services/productoService';
import { vendedorService } from '../_services/vendedorService';
import { Producto } from '../_modelos/productoModelo';
import { Imagen } from '../_modelos/imagenModelo';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-home-vendedor',
  templateUrl: './home-vendedor.component.html',
  styleUrls: ['./home-vendedor.component.css']
})
export class HomeVendedorComponent implements OnInit {

  productos : Producto[] = [];
  imagenes : Imagen[] = []
  nombre : String| any;

  constructor(
    private _router: Router,
    private productoService : productoService,
    private vendedorService: vendedorService) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe( data => {
      this.productos = data;
    })
  }

  buscar(search: String){

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
        this.vendedorService.cerrarSesionVendedor();
        console.log("verificacion");
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
}
