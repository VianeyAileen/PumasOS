import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  actualizarForm!: FormGroup;
  constructor( private _router: Router, private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.actualizarForm = this.fb.group({
      nuevoNombreProducto: ['', Validators.required],
      nuevoPrecioProducto: ['', Validators.required],
      nuevasUnidadesProducto: ['', Validators.required],
      nuevaDescripcionProducto: ['', Validators.required]
    });
  }

  mensajeActualizar(){
    Swal.fire({
      title: '¿Esás seguro/a?',
      text: "¡No podrás revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(["/informacionVendedor"]);
        Swal.fire(
          '¡Producto actualizado!',
          'Acción realizada con éxito',
          'success'
        )
      } else if (result.dismiss == Swal.DismissReason.cancel){
        this._router.navigate(["/informacionVendedor"])
      } 
    })
  }
}
