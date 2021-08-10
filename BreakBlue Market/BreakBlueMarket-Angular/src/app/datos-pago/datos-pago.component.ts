import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-datos-pago',
  templateUrl: './datos-pago.component.html',
  styleUrls: ['./datos-pago.component.css']
})
export class DatosPagoComponent implements OnInit {

  pagoForm!: FormGroup;
  constructor(private _router: Router, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.pagoForm = this.fb.group({
      nombrePago: ['', Validators.required],
      apellidoPago: ['', Validators.required],
      tarjetaPago: ['', Validators.required],
      expiracion: ['', Validators.required],
      cvv: ['', Validators.required],
      calle: ['', Validators.required],
      colonia: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      interior: ['', Validators.required],
      exterior:['', Validators.required],
      recibe: ['', Validators.required],
      telefono: ['', Validators.required]
    });
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
