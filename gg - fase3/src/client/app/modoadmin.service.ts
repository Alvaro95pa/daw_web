import {Injectable} from 'angular2/core';

import {Prod,infodetalle,comentario,usuario} from './clases';
import { Usuario } from './usuario.model'
import {Contenido} from './contenido.model';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

const prod_URL = 'http://localhost:8443/productos';
const comentarios_URL = 'http://localhost:8443/comentarios';
const content_URL = 'http://localhost:8443/contenido';
const users_URL = 'http://localhost:8443/users';

@Injectable()
export class modoadminservice {
  constructor(private http: Http) {}

  getProductos (){
    return this.http.get(prod_URL + '/all')
      .map(resp => resp.json())
      .catch(err => this.mostrarError(err));
  }

  getProductosFiltro(juego:number,series:number,pelis:number){
    return this.http.get(prod_URL + '/filtro/' + "/" + juego  + "/" + series  + "/" + pelis)
      .map(resp => resp.json())
      .catch(err => this.mostrarError(err));
  }

  getProd (id:number){
    return this.http.get(prod_URL + '/' + id)
      .map(resp => resp.json())
      .catch(err => this.mostrarError(err));
  }


  deleteProd(id:number){
    return this.http.delete(prod_URL + '/' + id)
      .map(resp => resp.json())
      .catch(err => this.mostrarError(err));
  }
  pushProd(produc:Prod){
    let body = JSON.stringify(produc);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    });
    let options = new RequestOptions({ headers });
    return this.http.post(prod_URL + '/nuevoproducto',body,options)
      .map(resp => resp.json())
      .catch(err => this.mostrarError(err));
  }

  deleteContenido(id:number){
    return this.http.delete(prod_URL + '/' + id)
      .map(resp => resp.json())
      .catch(err => this.mostrarError(err));
  }

  pushContenido(content:Contenido){
    let body = JSON.stringify(content);
    let headers = new Headers({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    });
    let options = new RequestOptions({ headers });
    return this.http.post(content_URL + '/',body,options)
      .map(resp => resp.json())
      .catch(err => this.mostrarError(err));
  }

  getContenido(){
    return this.http.get(content_URL + '/')
      .map(resp => resp.json())
      .catch(err => this.mostrarError(err));
  }


  getusuarios(){
    /*
    return Promise.resolve (usuarios_list);*/
  }

  deleteUser(user:Usuario){
    /*
    let position = USUARIOS.indexOf(user);
    USUARIOS.splice(position,1);
    console.log(position);
    */
  }

  private mostrarError(error: any){
    console.error(error);
    return Observable.throw("Server error (" + error.status + "): " + error.text())
  }
}
