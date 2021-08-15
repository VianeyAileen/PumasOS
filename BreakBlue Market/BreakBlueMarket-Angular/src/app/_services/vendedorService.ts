import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Vendedor } from '../_modelos/vendedorModelo';

@Injectable({ providedIn: 'root' })
export class vendedorService {

    private userUrl = 'http://localhost:5000';  // URL to REST API

    constructor(private http: HttpClient) { }

    obtenerVendedor(correo: string): Observable<any> {
        const url = `${this.userUrl}/login/${correo}`;
        return this.http.get<Vendedor>(url);
    }
}