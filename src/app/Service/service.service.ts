import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../Modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='https://proyectomifarma.azurewebsites.net/clientes';

  getClientes(){
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append('Access-Control-Allow-Origin','*');
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<Cliente[]>(this.Url, httpOptions);
  }

  crearClientes(cliente:Cliente){
    return this.http.post<Cliente>(this.Url,cliente);
  }
}
