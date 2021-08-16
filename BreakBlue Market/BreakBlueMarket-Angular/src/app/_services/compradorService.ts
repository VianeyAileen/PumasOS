import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";

import { Comprador } from "../_modelos/compradorModelo";
import { Observable } from "rxjs";

<<<<<<< HEAD
@Injectable({
    providedIn: "root"
})
=======
@Injectable({providedIn: 'root'})
>>>>>>> Develop

export class compradorService {
    private baseUrl = 'http://127.0.0.1:5000/';

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    //POST: agregamos un usuario comprador a la base de datos.
    agregarComprador(comprador: Comprador): Observable<Comprador>{
      return this.http.post<Comprador>(this.baseUrl + "/comprador", comprador);
    }

    //Login Comprador
    loginComprador(comprador: Comprador): Observable<Comprador> {
      return this.http.post<Comprador>(this.baseUrl + "/login", comprador);
    }

    postComprador(nombre: Comprador) {
      return this.http.post<any>(this.baseUrl + 'comprador/', nombre);
    }

    obtenerComprador(correo: String):Observable<Comprador> {
        return this.http.get<Comprador>(this.baseUrl+"/");
    }
<<<<<<< HEAD

    obtenerComprador(correo: String):Observable<Comprador> {
        return this.http.get<Comprador>(this.baseUrl+"/");
    }
}
=======
}
>>>>>>> Develop
