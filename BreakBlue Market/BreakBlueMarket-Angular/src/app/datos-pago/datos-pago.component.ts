import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-datos-pago',
  templateUrl: './datos-pago.component.html',
  styleUrls: ['./datos-pago.component.css']
})
export class DatosPagoComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  mensajeCompra(){
    Swal.fire({
      title: '¿Esás seguro/a?',
      text: "¡No podrás revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(["/homeComprador"]);
        Swal.fire(
          '¡Producto comprado!',
          'Acción realizada con éxito',
          'success'
        )
      } else if (result.dismiss == Swal.DismissReason.cancel){
        this._router.navigate(["/informacionComprador"])
      } 
    })
  }

}
