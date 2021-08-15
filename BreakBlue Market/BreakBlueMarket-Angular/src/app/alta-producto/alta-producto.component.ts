import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Producto } from '../_modelos/productoModelo';
import { productoService } from '../_services/productoService';

// import { Imagen } from '../_modelos/imagenModelo';
// import { imagenService } from '../_services/imagenService';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {

  //Datos que pedimos para dar de alta un producto
  @Input() producto: Producto = {id: 0, nombre: '', marca: '', descripcion: '', precio: 0.00 ,unidadesDisponibles:0 , correo: 'hhdh@gmail.com', imagen: ''}

  // @Input() imagenes: Imagen = {id:0, imagen:''}

  agregarForm!: FormGroup;

  respuesta: any = [];
  error: any = [];


  
  constructor(
    private fb: FormBuilder,
    private productoService: productoService,
    private _router: Router) {
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
      descripcionProducto: ['', Validators.required],
      imagenProducto: ['', Validators.required]
    });
  }


  // Subimos los datos a la BD
  agregarProducto() {
    console.log(this.producto)
    this.productoService.agregarProducto(this.producto).subscribe(
      // Si no hay errores mandamos un mensaje de exito
      respuesta => {
        console.log('Producto dado de alta');
        // Mandamos el mensaje de que el producto fue dado de alta
        this.mensajeAltaProducto();
        // Rederigimos al vendedor a la página donde estan todos sus productos
        this._router.navigate(["/homeVendedor"]);
      },
      // En caso contrario Mandamos un error
      error => {
        console.log('error');
        //Se manda el mensaje de error
        this.mensajeError();
        // Rederigimos al vendedor a la misma página
        this._router.navigate(["/homeVendedor"]);

      }
    )
  }

  // agregarImagenes(id:number) {
  //   for (let url of this.urls) {
  //     let img: Imagen = {id: id, imagen: url};
  //     this.imagenService.agregarImagenes(id, img).subscribe(respuesta =>{
  //       console.log('Imagen dada de alta');
  //     })      
  //   }
  // }

  // Mensaje que se manda cuando el producto fue dado de alta de forma exitosa
  mensajeAltaProducto(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto Dado de Alta',
      showConfirmButton: false,
      timer: 2500
    })
  }

  // Mensaje que se manda cuando ocurre un error al conectarse con el servidor
  mensajeError(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocurrio un error en el servidor',
      text: 'Por favor intente subir su producto de nuevo, sino intentarlo más tarde',
      showConfirmButton: true,
    })
  }

  // Función para subir una imagen
  urls = new Array<string>();
  onSelectFile(event: any) {
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