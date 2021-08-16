import { Component,OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Comprador } from '../_modelos/compradorModelo';
import { compradorService } from '../_services/compradorService';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{
  
  @Input() comprador: Comprador = {correo: '', nombre: 'x' , apellidos: 'x', contrasena: '',contrasena2: 'x', tipo: 'x', nombreUsuario: 'x', genero: 'x', edad: 0}

  respuesta: any = [];
  error: any = [];
  
  loginForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private compradorService: compradorService,
    private _router: Router ) {
      this.createForm();
    }

  ngOnInit(): void{ } 

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }

  //Iniciamos Sesión
  loginComprador() {
    console.log(this.comprador.correo, this.comprador.contrasena)
    this.compradorService.loginComprador(this.comprador.correo && this.comprador.contrasena).subscribe(
      respuesta => {
        console.log('Sesión Iniciada');
        this.mensajeLogin();
        this._router.navigate(["/homeVendedor"]);
      },
      error => {
        console.log('error');
        this.mensajeError();
        this._router.navigate(["/"]);
      }
    )
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
      text: 'Por favor intente subir su producto de nuevo, sino intentarlo más tarde',
      showConfirmButton: true,
    })
  }
}