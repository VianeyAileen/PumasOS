import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Calificacion } from '../_modelos/calificacionModelo';
import { Comentario } from '../_modelos/comentarioModelo';

import { calificacionService } from '../_services/calificacionService';
import { comentarioService } from '../_services/comentarioService';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {
  id: number | any = 0 ;

  @Input() calificacion: Calificacion = {id: 0, calificacion: ''}
  @Input() comentario: Comentario = {id: 0, comentario: ''}

  opinionForm!: FormGroup;
  respuesta: any = [];
  error: any = [];

  constructor(private fb: FormBuilder, private _router: Router,
              private calificacionService: calificacionService,
              private comentarioService: comentarioService) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.opinionForm = this.fb.group({
      opinion: ['', Validators.required],
      calificacion: ['', Validators.required]
    });
  }

  agregarCalificacion() {
    console.log(this.calificacion)
    this.calificacionService.agregarCalificacion(this.id, this.calificacion).subscribe(
      // Si no hay errores mandamos un mensaje de exito
      respuesta => {
        this.mensajeOpinion();

        // Rederigimos al vendedor a la página donde estan todos sus productos
        this._router.navigate(["/homeComprador"]);
      },
      // En caso contrario Mandamos un error
      error => {
        console.log('error');
        //Se manda el mensaje de error
        this.mensajeError();
        // Rederigimos al vendedor a la misma página
        this._router.navigate(["/homeComprador"]);

      }
    )
  }

  agregarComentario() {
    console.log(this.calificacionService)
    this.comentarioService.agregarComentario(this.id, this.comentario).subscribe(
      // Si no hay errores mandamos un mensaje de exito
      respuesta => {
        this.mensajeOpinion();

        // Rederigimos al vendedor a la página donde estan todos sus productos
        this._router.navigate(["/homeComprador"]);
      },
      // En caso contrario Mandamos un error
      error => {
        console.log('error');
        //Se manda el mensaje de error
        this.mensajeError();
        // Rederigimos al vendedor a la misma página
        this._router.navigate(["/homeComprador"]);

      }
    )
  }

  enviar(){
    this.agregarComentario(),
    this.agregarCalificacion()
  }

  // Mensaje que se manda cuando ocurre un error al conectarse con el servidor
  mensajeError(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocurrio un error en el servidor',
      text: 'Por favor intente enviar su opinión de nuevo, sino intentarlo más tarde',
      showConfirmButton: true,
    })
  }

  mensajeOpinion(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Opinión Enviada',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
