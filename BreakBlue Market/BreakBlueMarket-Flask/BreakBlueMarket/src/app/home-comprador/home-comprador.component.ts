import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-home-comprador',
  templateUrl: './home-comprador.component.html',
  styleUrls: ['./home-comprador.component.css']
})
export class HomeCompradorComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
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
         this._router.navigate(["/homeComprador"])
      } 
    })
  }
}
