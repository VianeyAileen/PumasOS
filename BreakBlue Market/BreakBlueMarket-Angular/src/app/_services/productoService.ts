import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";

import { Producto } from "../_modelos/productoModelo";

@Injectable({ providedIn: 'root'})
export class productoService {

    // URL de la API 
    private useUrl = "http://127.0.0.1:5000";

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    // POST: agrega un nuevo producto
    agregarProducto(producto : Producto): Observable<Producto> {
        return this.http.post<Producto>(this.useUrl + "/altaProducto", producto);
    }

    obtenerProducto(nombre: String) {
        let json = this.http.get(this.useUrl + "/producto/"+ nombre);
        return json;
    }
}