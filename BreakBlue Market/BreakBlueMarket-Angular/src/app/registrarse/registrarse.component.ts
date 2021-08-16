import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Vendedor } from '../_modelos/vendedorModelo';
import { Comprador } from '../_modelos/compradorModelo';

import{ compradorService } from '../_services/compradorService';
import{ vendedorService } from '../_services/vendedorService';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  //Datos solicitados para el registro
  @Input() comprador: Comprador = {correo: '', nombre: '', apellidos: '', contrasena: '',contrasena2: '', tipo: '', nombreUsuario: '', genero: '', edad: 0}

  @Input() vendedor: Vendedor = {correo: '', nombre: '', apellidos: '', contrasena: '',contrasena2: '', tipo: '', nombreUsuario: '', genero: '', edad: 0}

  registroForm!: FormGroup;

  respuesta: any = [];

  constructor(private fb: FormBuilder, private compradorService: compradorService, private vendedorService: vendedorService, private _router: Router) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  //verificamos que no sean vacios los campos que se nos proporcionan.
  createForm() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', Validators.required],
      edad: ['', Validators.required],
      contrasena: ['', Validators.required, ],
      contrasena2: ['', Validators.required],
      tipo: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  registraComprador(){
    if(this.comprador.tipo === 'Comprador'){
      console.log(this.comprador)
      this.compradorService.agregarComprador(this.comprador).subscribe(respuesta => {
        var str1 =new String(respuesta.toString());
        console.log(str1);
        console.log(respuesta);
        if(str1 != 'error al registrar al comprador'){
          console.log('1');
          console.log('comprador registrado');
          this.mensajeUsuarioRegistrado();
          this._router.navigate(["/login"]);
        }else{
          console.log('0');
          this.mensajeUsuarioCorreoRegistrado();
          this._router.navigate(["/comprador"]);
        }
      })
    }else{
      console.log(this.vendedor)
      this.vendedorService.agregarVendedor(this.vendedor).subscribe(respuesta => {
        var str2 =new String(respuesta.toString());
        console.log(str2);
        console.log(respuesta);
        if(str2 != 'error al registrar al vendedor'){
          console.log('1');
          console.log('vendedor registrado');
          this.mensajeUsuarioRegistrado2();
          this._router.navigate(["/login"]);
        }else{
          console.log('0');
          this.mensajeUsuarioCorreoRegistrado();
          this._router.navigate(["/comprador"]);
        }
      })
    }
  }

  mensajeUsuarioRegistrado(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Comprador Registrado',
      showConfirmButton: false,
      timer: 2500
    })
  }

  mensajeUsuarioRegistrado2(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Vendedor Registrado',
      showConfirmButton: false,
      timer: 2500
    })
  }

  mensajeUsuarioCorreoRegistrado(){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'El correo ingresado ya se encuentra registrado',
      showConfirmButton: false,
      timer: 2500
    })
  }

}
