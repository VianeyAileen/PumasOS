import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  @Input() producto: Producto = {id: 0, nombre: '', marca: '', descripcion: '', precio: 0.00 ,unidadesDisponibles:0 , correo: 'hhdh@gmail.com', imagen: ''}


  agregarForm!: FormGroup;

  previsualizacion : string |any;

  
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
  onSelectFile(event : Event|any) : any{
    console.log(event)
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then( (imagen : any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    })
  }
  

  extraerBase64 = async ($event : any) => new Promise((resolve, reject) => {
    try{
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base : reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base : null
        });
      };
    }catch(e){
      reject ;
    }
  })
}