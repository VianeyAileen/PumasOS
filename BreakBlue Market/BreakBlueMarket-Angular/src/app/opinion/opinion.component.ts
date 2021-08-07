import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
