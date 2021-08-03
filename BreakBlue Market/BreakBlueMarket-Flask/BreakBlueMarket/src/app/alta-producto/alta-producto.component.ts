import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mensajeAltaProducto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto Dado de Alta',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
