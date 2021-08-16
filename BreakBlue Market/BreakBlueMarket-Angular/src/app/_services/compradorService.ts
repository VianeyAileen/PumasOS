import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import { Comprador } from "../_modelos/compradorModelo";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class compradorService {
    private baseUrl = 'http://localhost:4200/';
    
    constructor(private http: HttpClient) { }

    postComprador(nombre: Comprador) {
        return this.http.post<any>(this.baseUrl + 'comprador/', nombre);
    }

    obtenerComprador(correo: String):Observable<Comprador> {
        return this.http.get<Comprador>(this.baseUrl+"/");
    }
}