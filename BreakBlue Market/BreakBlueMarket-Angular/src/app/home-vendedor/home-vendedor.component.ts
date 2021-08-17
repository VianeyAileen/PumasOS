import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { productoService } from '../_services/productoService';
import { Producto } from '../_modelos/productoModelo';
import { Imagen } from '../_modelos/imagenModelo';

import Swal from 'sweetalert2'
import { Observable, Subscriber } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { imagenService } from '../_services/imagenService';

@Component({
  selector: 'app-home-vendedor',
  templateUrl: './home-vendedor.component.html',
  styleUrls: ['./home-vendedor.component.css']
})
export class HomeVendedorComponent implements OnInit {

  previsualizacion : string | any;
  productos : Producto[] = [];
  nombre : String| any;

  correo : string | any;

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private productoService : productoService,
    private imagenService : imagenService,
    private activateRoute : ActivatedRoute) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.correo = this.activateRoute.snapshot.paramMap.get('correo');
    this.productoService.obtenerProductos().subscribe( data => {
      this.productos = data;
    })
  }

  createForm() {
    this.searchForm = this.fb.group({
      search: ['', Validators.required]
  });
  }

  submit(){
    let search = this.searchForm.value.search;
    if(search){
      this.productoService.obtenerProducto(search).subscribe(data => {
        if(data[0]){
          this._router.navigate(['/informacionVendedor',data[0].id, data[0].nombre, data[0].correo]);
        }else{
          Swal.fire(
            'No se encontro el producto',
            'Ninguna coincidencia en la base de datos'
          )
        }
      })
    }
  }

  obtenerImagen(imagen : String){
    this.onSelectFile(imagen);
    return true;
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
         this._router.navigate(["/homeVendedor"])
      } 
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
