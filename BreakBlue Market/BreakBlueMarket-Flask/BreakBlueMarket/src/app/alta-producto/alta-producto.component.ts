import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {

  agregarForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void { }

  createForm() {
    this.agregarForm = this.fb.group({
      nombreProducto: ['', Validators.required ],
      marcaProducto: ['', Validators.required],
      precioProducto: ['', Validators.required],
      unidadesProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required]
    });
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
