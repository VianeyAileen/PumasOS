import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2'

import { Producto } from '../_modelos/productoModelo';
import { productoService } from '../_services/productoService';


@Component({
  selector: 'app-datos-pago',
  templateUrl: './datos-pago.component.html',
  styleUrls: ['./datos-pago.component.css']
})
export class DatosPagoComponent implements OnInit {

  id :number|any;
  nombre : string|any;
  producto : any |Producto = {id: 0, nombre: '', marca: '', descripcion: '', precio: 0.00 ,unidadesDisponibles:0 , correo: 'hhdh@gmail.com', imagen: ''};


  pagoForm!: FormGroup;
  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private productoService: productoService,
    private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
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
        this.productoService.obtenerProducto(this.nombre).subscribe(data => {
          this.producto = data;
        });
        
        this.productoService.comprarProducto(this.id, this.producto).subscribe(data2 => {
          console.log(data2);
        });

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
