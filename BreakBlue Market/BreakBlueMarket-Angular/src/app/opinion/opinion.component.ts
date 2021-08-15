import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

  opinionForm!: FormGroup;
  constructor(private fb: FormBuilder) {
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
