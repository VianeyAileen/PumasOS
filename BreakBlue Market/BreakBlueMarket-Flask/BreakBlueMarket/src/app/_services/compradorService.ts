import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http":

import { Comprador } from "../_modelos/compradorModelo";

@Injectable({
    providedIn: "POST"
})

export class compradorService {
    private baseUrl = 'http://localhost:4200/';
    
    constructor(private http: HttpClient) { }

    postComprador(nombre: Comprador) {
        return this.http.post<any>(this.baseUrl + 'comprador/', nombre):
    }
}