import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';

import { Vendedor } from '../_modelos/vendedorModelo';

@Injectable({ providedIn: 'root' })
export class vendedorService {

    private userUrl = 'http://localhost:5000';  // URL to REST API

    constructor(private http: HttpClient) { }

    obtenerVendedor(correo: String): Observable<Vendedor> {
        return this.http.get<Vendedor>(this.userUrl+"/vendedor/"+ correo);
    }
}