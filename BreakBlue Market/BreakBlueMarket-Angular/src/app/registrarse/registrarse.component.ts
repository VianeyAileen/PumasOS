import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Vendedor } from '../_modelos/vendedorModelo';
import { Comprador } from '../_modelos/compradorModelo';

import{ compradorService } from '../_services/compradorService';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  //Datos solicitados para el registro
  @Input() comprador: Comprador = {correo: '', nombre: '', apellidos: '', contrasena: '',contrasena2: '', tipo: '', nombreUsuario: '', genero: '', edad: 0}

  registroForm!: FormGroup;

  respuesta: any = [];

  constructor(private fb: FormBuilder, private compradorService: compradorService, private _router: Router) {
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
      contrasena: ['', Validators.required],
      contrasena2: ['', Validators.required],
      tipo: ['', Validators.required],
      genero: ['', Validators.required]
    });
  }

  registraComprador(){
    console.log(this.comprador)
    this.compradorService.agregarComprador(this.comprador).subscribe(respuesta => {
      console.log('comprador registrado');

      this.mensajeUsuarioRegistrado();
      this._router.navigate(["/login"]);
    })
  }

  mensajeUsuarioRegistrado(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Comprador Registrado',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
