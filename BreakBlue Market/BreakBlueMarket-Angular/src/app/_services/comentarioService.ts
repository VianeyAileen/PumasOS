import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";

import { Comentario } from "../_modelos/comentarioModelo";


@Injectable({ providedIn: 'root'})
export class comentarioService {

    // URL de la API
    private useUrl = "http://127.0.0.1:5000";

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    // POST: agrega un nuevo comentario
    agregarImagenes(id: number, comentario : Comentario): Observable<Comentario>{
        return this.http.post<Comentario>(this.useUrl +"/calificacion/"+id, comentario);
    }

    // GET: obtiene los comentarios
    obtenerComentarios(id:number) : Observable<Comentario[]>{
        return this.http.get<Comentario[]>(this.useUrl + "/comentario/" + id)
    }

    // POST: agrega un nuevo comentario
    agregarComentario(id: number, comentario : Comentario): Observable<Comentario>{
        return this.http.post<Comentario>(this.useUrl +"/calificacion/"+id, comentario);
    }
}
