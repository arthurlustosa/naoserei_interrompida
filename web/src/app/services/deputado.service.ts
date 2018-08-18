import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeputadoService {

  constructor(private http: HttpClient) { }

  public listarDeputadas() {
    return this.http.get(environment.baseApi + 'deputadas');
  }

  public getDeputado(id) {
    return this.http.get(environment.baseApi + 'deputadas/' + id);
  }

}
