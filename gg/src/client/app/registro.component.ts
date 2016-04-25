import { Component,Input } from 'angular2/core';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { Datos } from './datos.model';

@Component({
  selector: 'registro-component',
  templateUrl: 'app/registro.component.html'
})

export class registrar {
  //Variables
  correo: string;
  usuario: string;
  contrasena: string;
  contrasena2: string;
  nuevo_usuario: Usuario;
  nuevo_datos: Datos;
  boton:boolean = false;
  error: boolean = false;
  id: number = 3;
  //Métodos
  constructor (private _usuarioService: UsuarioService){}
  registrar(){
    this.nuevo_datos = {
      nAmigos: 0,
      nPelis: 0,
      nSeries: 0,
      nJuegos: 0,
      ultima: "hoy",
      tUsuario: "hoy",
      fPeli: null,
      fSerie: null,
      fJuego: null,
      pPerfilTodos: true,
      cPerfilTodos: true,
      aPerfilTodos: true,
      contenido: [],
      amigos: []
    }
    this.nuevo_usuario = {
      id: this.id,
      nombre: '',
      apellidos: '',
      nacionalidad: '',
      cumpleanos: '',
      usuario: this.usuario,
      contrasena: this.contrasena,
      correo: this.correo,
      imagen: 'img/avatar.png',
      datos: this.nuevo_datos
    };
    this._usuarioService.addUsuario(this.nuevo_usuario);
    this.id = this.id + 1;
  }
}
