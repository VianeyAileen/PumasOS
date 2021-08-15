import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Producto } from "../_modelos/productoModelo";

@Injectable({ providedIn: 'root'})
export class productoService {

    private useUrl = "http://127.0.0.1:5000";

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    // POST: agrega un nuevo producto
    agregarProducto(producto : Producto): Observable<Producto> {
        return this.http.post<Producto>(this.useUrl + "/altaProducto", producto);
    }

    // UPDATE
    actualizarProducto(producto : Producto): Observable<Producto> {
        return this.http.post<Producto>(this.useUrl + "/actualizar", producto);
    }

    // GET: ver opiniones
    obtenerOpinion(producto : Producto): Observable<Producto> {
        return this.http.post<Producto>(this.useUrl + "/comentario", producto);
    }

    // GET: ver calificaciones
    obtenerCalificacion(producto : Producto): Observable<Producto> {
        return this.http.post<Producto>(this.useUrl + "/calificacion", producto);
    }

    // POST: agrega una nueva opinion
    darOpinion(producto : Producto): Observable<Producto> {
        return this.http.post<Producto>(this.useUrl + "/addOp", producto);
    }

    

    
}