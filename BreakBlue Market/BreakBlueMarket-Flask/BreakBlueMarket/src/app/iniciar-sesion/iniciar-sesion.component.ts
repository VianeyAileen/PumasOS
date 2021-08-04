import { Component,OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    
  }
  
  mensajeLogin(){
    Swal.fire('Bienvenido/a a BreakBlueMarket :D')
  }

  
}

// export class IniciarSesionComponent {

//   loginForm = new FormGroup({
//     email: new FormControl('', Validators.required),
//     password: new FormControl('', Validators.required)
//   })

//   get email(){return this.loginForm.get('email')}
//   get password(){return this.loginForm.get('password')}
// }




