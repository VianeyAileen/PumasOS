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

    // UPDATE
    actualizarProducto(id: number, producto : Producto): Observable<Producto> {
        return this.http.put<Producto>(this.useUrl + "/actualizar/"+id, producto);
    }
    
    obtenerProducto(nombre: String): Observable<Producto[]> {
        return this.http.get<Producto[]>(this.useUrl + "/producto/"+ nombre);
    }

    obtenerProductos() :Observable<Producto[]>{
        return this.http.get<Producto[]>(this.useUrl + "/producto");
    }

    comprarProducto(id: number, producto :Producto): Observable<Producto> {
        let response = this.http.put<Producto>(this.useUrl + "/comprar/"+ id, producto);
        console.log(id);
        console.log(response)
        return response;
    }
    
    // DELETE: elimina un producto dado un id
    eliminaProducto(id: number) {        
        return this.http.delete<any>(this.useUrl + "/eliminar/" + id);
    }
}