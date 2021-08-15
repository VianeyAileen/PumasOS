import { Component,OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { Vendedor } from '../_modelos/vendedorModelo';
import { vendedorService } from '../_services/vendedorService';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{
  
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void{ } 

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });
  }
  
  mensajeLogin(){
    Swal.fire('Bienvenido/a a BreakBlueMarket :D')
  }

  
}