import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";

import { Calificacion } from "../_modelos/calificacionModelo";


@Injectable({ providedIn: 'root'})
export class calificacionService {
    
    // URL de la API 
    private useUrl = "http://127.0.0.1:5000";

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    // POST: agrega una nueva calificacion
    agregarCalificacion(id: number, calificacion : Calificacion): Observable<Calificacion>{
        return this.http.post<Calificacion>(this.useUrl +"/calificacion/"+id, calificacion);
    }

    // GET: obtiene las calificaciones
    obtenerCalificaciones(id:number) : Observable<Calificacion[]>{
        return this.http.get<Calificacion[]>(this.useUrl + "/calificacion/" + id)
    }
}