import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

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

    obtenerProducto(nombre: string): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.useUrl + "/producto/"+ nombre);
    }

    obtenerProductos() :Observable<Producto[]>{
        return this.http.get<Producto[]>(this.useUrl + "/producto");
    }

    // DELETE: elimina un producto dado un id
    eliminaProducto(id: number) {        
        return this.http.delete<any>(this.useUrl + "/eliminar/" + id);
    }
}