import { Injectable } from '@angular/core';

/// Librerías
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

//
import { Observable } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json', //va en formato JSON
      'Access-Control-Allow-Origin':'**'
    })
  }

  constructor(private http: HttpClient) { }

  //Dirección url
  direccion = 'https://jsonplaceholder.typicode.com/posts';
  direccionDolar = 'https://mindicador.cl/api/dolar';

  //Método que permite recuperar todos los registros
  getPosts():Observable<any>{
    return this.http.get(this.direccion).pipe(retry(3));
  }

  //Método que permite recuperar sólo un registro
  getPost(id):Observable<any>{
    return this.http.get(this.direccion+'/'+id).pipe(retry(3));
  }

  //Método que permite recuperar el valor del dolar
  getDolar():Observable<any>{
    return this.http.get(this.direccionDolar).pipe(retry(3));
  }

  //Método que permite almacenar 
  crearPost(post):Observable<any>{
    return this.http.post(this.direccion,post, this.httpOptions).pipe(retry(3));
  }

  //Método que permite actualizar
  updatePost(id,post):Observable<any>{
    return this.http.put(this.direccion+'/'+id,post,this.httpOptions).pipe(retry(2));
  }

  //Método que permite eliminar
  deletePost(id){
    return this.http.delete(this.direccion+'/'+id,this.httpOptions).pipe(retry(2));
  }

}
