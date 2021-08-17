import { Component,OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Comprador } from '../_modelos/compradorModelo';
import { Vendedor } from '../_modelos/vendedorModelo';

import { compradorService } from '../_services/compradorService';
import { vendedorService } from '../_services/vendedorService';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{
  
  @Input() comprador: Comprador = {correo: '', nombre: 'x' , apellidos: 'x', contrasena: '',contrasena2: 'x', tipo: 'Comprador', nombreUsuario: 'x', genero: 'x', edad: 0}

  @Input() vendedor: Vendedor = {correo: '', nombre: 'x' , apellidos: 'x', contrasena: '',contrasena2: 'x', tipo: 'Vendedor', nombreUsuario: 'x', genero: 'x', edad: 0}

  respuesta: any = [];
  error: any = [];
  
  loginForm!: FormGroup;
  loginFormV!: FormGroup;

  correo : string  | any;
  
  constructor(
    private fb: FormBuilder,
    private lfv: FormBuilder,
    private compradorService: compradorService,
    private vendedorService: vendedorService,
    private _router: Router) {
      this.createForm();
      this.createFormV();
    }

  ngOnInit(): void{ } 

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  createFormV() {
    this.loginFormV = this.lfv.group({
      emailV: ['', Validators.required ],
      passwordV: ['', Validators.required]
    });
  }

  //Iniciamos Sesión de Vendedor
  loginVendedor() {
    console.log(this.vendedor.correo, this.vendedor.contrasena, this.vendedor.tipo)
    if (this.vendedor.tipo==='Vendedor') {
      this.vendedorService.loginVendedor(this.vendedor).subscribe(
        respuesta => {
          console.log('Sesión Iniciada');
          this.mensajeLogin();
          this._router.navigate(['/homeVendedor',this.vendedor.correo]);
        },
        error => {
          console.log('Correo o contraseña inválido');
          this.mensajeAuth();
          this._router.navigate(["/login"]);
        }
      )
    } else {
      this.mensajeError();
    }   
  }

  //Iniciamos Sesión del Ccomprador
  loginComprador() {
    console.log(this.comprador.correo, this.comprador.contrasena)
    if (this.comprador.tipo==='Comprador') {
      this.compradorService.loginComprador(this.comprador).subscribe(
        respuesta => {
          console.log('Sesión Iniciada');
          this.mensajeLogin();
          this._router.navigate(["/homeComprador"]);
        },
        error => {
          console.log('Correo o contraseña inválido');
          this.mensajeAuth();
          this._router.navigate(["/login"]);
        }
      )
    } else {
      this.mensajeError();
    }
  }
  
  // Mensaje que se manda cuando se inicia sesión correctamente
  mensajeLogin(){
    Swal.fire('Bienvenido/a a BreakBlueMarket :D')
  }
  
  // Mensaje que se manda cuando ocurre un error al conectarse con el servidor
  mensajeError(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocurrio un error en el servidor',
      text: 'Por favor intente iniciar sesión de nuevo, sino intentarlo más tarde',
      showConfirmButton: true,
    })
  }

  mensajeAuth(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Correo o Contraseña inválido',
      text: 'Por favor verifique sus datos',
      showConfirmButton: true,
    })
  }
}