import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";

import { Imagen } from "../_modelos/imagenModelo";


@Injectable({ providedIn: 'root'})
export class imagenService {
    
    // URL de la API 
    private useUrl = "http://127.0.0.1:5000";

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    // POST: agrega un nuevo producto
    // agregarImagenes(id: number, imagen : string): Observable<Imagen>{
    //     return this.http.post<Imagen>(this.useUrl +"/imagen/"+id);
    // }

    // GET: obtiene las imagenes
    obtenerImagenes(id:number) : Observable<Imagen[]>{
        return this.http.get<Imagen[]>(this.useUrl + "/imagen/" + id)
    }
}