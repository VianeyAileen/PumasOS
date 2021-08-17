import { Observable } from "rxjs";

export interface Imagen {
    id: number;
    imagen: Observable<any>
}