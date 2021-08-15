import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  registroForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

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
}
