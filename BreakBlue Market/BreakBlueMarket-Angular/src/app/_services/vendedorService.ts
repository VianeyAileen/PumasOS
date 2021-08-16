import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
=======
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';
>>>>>>> Jose

import { Vendedor } from '../_modelos/vendedorModelo';

@Injectable({ providedIn: 'root' })
export class vendedorService {

    private userUrl = 'http://localhost:5000';  // URL to REST API

    constructor(private http: HttpClient) { }

<<<<<<< HEAD
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    //LoginVendedor
    loginVendedor(correo: string): Observable<any> {
        return this.http.post<Vendedor>(this.userUrl + "/login", correo);
=======
    obtenerVendedor(correo: String): Observable<Vendedor> {
        return this.http.get<Vendedor>(this.userUrl+"/vendedor/"+ correo);
>>>>>>> Jose
    }
}