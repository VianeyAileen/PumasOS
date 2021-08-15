import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Producto } from '../_modelos/productoModelo';
import { productoService } from '../_services/productoService';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {

  //Datos que pedimos para dar de alta un producto
  @Input() producto: Producto = {nombre: '', marca: '', descripcion: '', precio: 0.00 ,unidadesDisponibles:0 , correo: 'hhdh@gmail.com'}

  agregarForm!: FormGroup;

  respuesta: any = [];


  constructor(private fb: FormBuilder, private productoService: productoService) {
    this.createForm();
   }

  ngOnInit(): void { }

  // Validamos que los campos no sean vacíos en el formulario
  createForm() {
    this.agregarForm = this.fb.group({
      nombreProducto: ['', Validators.required ],
      marcaProducto: ['', Validators.required],
      precioProducto: ['', Validators.required],
      unidadesProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required]
    });
  }

  // Subimos los datos a la BD
  agregarProducto() {
    console.log(this.producto)
    this.productoService.agregarProducto(this.producto).subscribe(respuesta => {
      console.log('Producto dado de alta');
      // Mandamos el mensaje
      this.mensajeAltaProducto();
    })
  }

  // Mensaje que se manda cuando el producto fue dado de alta de forma exitosa
  mensajeAltaProducto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto Dado de Alta',
      showConfirmButton: false,
      timer: 1500
    })
  }

  // Función para subir una imagen
  urls = new Array<string>();
  detectFiles(event: any) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }
}
