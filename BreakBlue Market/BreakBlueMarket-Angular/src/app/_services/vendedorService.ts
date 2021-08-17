import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable} from "rxjs";

import { Vendedor } from "../_modelos/vendedorModelo";


@Injectable({ providedIn: 'root' })

export class vendedorService {

    private baseUrl = 'http://127.0.0.1:5000/';

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    obtenerVendedor(correo: String): Observable<Vendedor> {
        return this.http.get<Vendedor>(this.baseUrl+"/vendedor/"+ correo);
    }

    //Login Vendedor
    loginVendedor(vendedor: Vendedor): Observable<Vendedor> {
        return this.http.post<Vendedor>(this.baseUrl + "/loginVendedor", vendedor);
      }
    
    //POST: agregamos un usuario comprador a la base de datos.
    agregarVendedor(vendedor: Vendedor): Observable<Vendedor>{
      return this.http.post<Vendedor>(this.baseUrl + "/vendedor", vendedor);
    }
}
