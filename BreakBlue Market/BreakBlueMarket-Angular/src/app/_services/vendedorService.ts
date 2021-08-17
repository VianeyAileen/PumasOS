import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable} from "rxjs";

import { Vendedor } from "../_modelos/vendedorModelo";


@Injectable({ providedIn: 'root' })
export class vendedorService {

    private userUrl = 'http://127.0.0.1:5000/';  // URL to REST API

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    obtenerVendedor(correo: String): Observable<Vendedor> {
        return this.http.get<Vendedor>(this.userUrl+"/vendedor/"+ correo);
    }

    //Login Vendedor
    loginVendedor(vendedor: Vendedor): Observable<Vendedor> {
        return this.http.post<Vendedor>(this.userUrl + "/loginVendedor", vendedor);
    }
    
    //POST: agregamos un usuario comprador a la base de datos.
    agregarVendedor(vendedor: Vendedor): Observable<Vendedor>{
      return this.http.post<Vendedor>(this.userUrl + "/vendedor", vendedor);
    }
}
