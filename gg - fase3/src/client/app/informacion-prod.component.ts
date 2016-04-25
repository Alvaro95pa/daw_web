import {Component,OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import { RouteParams } from 'angular2/router';

import {Prod,infodetalle,infotecnica,requisitosinfor,comentario} from './clases';
import {Sesion} from './sesion.model';
import {comentarioscomponent} from './comentarios.component';
import {clasesservice} from './clases.service';
import {SesionService} from './sesion.service';
import {UsuarioService} from './usuario.service';


@Component({
  selector:'prod-detalle',
  template: `
    <div class="panel-group" *ngFor="#produc of producto">
      <div class="panel panel-danger">
        <div class="panel-heading">Datos Básicos</div>
        <div class="panel-body">
          <div  class="datos col-md-9 col-xs-7">
            <h4>Información técnica</h4>
            <dl  *ngIf="aux_tipoprod!=1 && visible">
              <dt>Fecha de lanzamiento: </dt>
              <dd>{{produc.infotecnic.fecha}}</dd>
              <dt>Género: </dt>
              <dd><span class="label label-default">{{produc.infotecnic.genero}}</span></dd>
              <dt>Director:</dt>
              <dd>{{produc.infotecnic.desarrollador}}</dd>
              <dt>Patrocinador:</dt>
              <dd>{{produc.infotecnic.editor}}</dd>
            </dl>
            <dl  *ngIf="aux_tipoprod==1 && visible">
              <dt>Fecha de lanzamiento: </dt>
              <dd>{{produc.infotecnic.fecha}}</dd>
              <dt>Género: </dt>
              <dd><span class="label label-default">{{produc.infotecnic.genero}}</span></dd>
              <dt>Desarrollador:</dt>
              <dd>{{produc.infotecnic.desarrollador}}</dd>
              <dt>Editor:</dt>
              <dd>{{produc.infotecnic.editor}}</dd>
              <dt>Plataformas:</dt>
              <dd><span class="label label-default">{{produc.infotecnic.plataforma}}</span></dd>
            </dl>
            <div *ngIf="aux_tipoprod==1 && visible">
              <h4>Requisitos del sistema</h4>
              <dl>
                <dt>Procesador:</dt>
                <dd>{{produc.inforequisitos.procesador}}</dd>
                <dt>Memoria:</dt>
                <dd>{{produc.inforequisitos.memoria}}</dd>
                <dt>Gráficos:</dt>
                <dd>{{produc.inforequisitos.graficos}}</dd>
                <dt>Almacenamiento:</dt>
                <dd>{{produc.inforequisitos.almacenamiento}}</dd>
              </dl>
            </div>
          </div>

          <div class="portada col-md-3 col-xs-5">
            <img src={{produc.img}}>
            <div *ngIf="sesion.loged" (click)="AddSeguir(produc)" [class.checkfavorito]="seguir" class="favorito col-md-12 col-xs-12">
              <div><span class="glyphicon glyphicon-plus"></span>Seguir</div>
            </div>
          </div>

        </div>
      </div>
      <div *ngIf="produc.sinopsis" class="panel panel-danger sinopsis">
        <div class="panel-heading">Sinopsis</div>
        <div class="panel-body">
          <p>{{produc.sinopsis}}</p>
        </div>
      </div>

      <div *ngIf="produc.trailer" class="panel panel-danger trailer">
        <div class="panel-heading">Trailer</div>
        <div class="panel-body ">
           <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" src={{produc.trailer}}></iframe>
           </div>
        </div>
      </div>

      <div *ngIf="comentarios" class="panel panel-danger comentarios">
        <div class="panel-heading">Comentarios</div>
        <div class="panel-body">
          <div *ngFor="#coment of comentarios">
            <comentarios [comentario]="coment"></comentarios>
          </div>
        </div>
       </div>

       <div *ngIf="sesion.loged" class="panel panel-danger comentarios respuesta">
        <div class="panel-heading">
          <button type="button" class="btn btn-primary btn_respuesta" onclick="document.getElementById('oculto').style.display = 'block';"><span class="glyphicon glyphicon-plus"></span> Responder</button></div>
        <div class="panel-body" id="oculto" style='display:none;'>
          <div class="col-md-12 col-xs-12 respuesta">
            <header class="col-md-2 col-xs-2">
              <dl>
                <dd><img src={{sesion.imagen}}></dd>
                <dd><a>{{sesion.usuario}}</a></dd>
              </dl>
            </header>
            <div class="col-sm-10 col-xs-10">
              <div class="text col-sm-12 col-xs-12">
                <div class="col-sm-10">
                  <p>Mensaje:</p>
                  <textarea class="mens"   [(ngModel)]="respuesta">Escribe</textarea>
                </div>
                <div class="col-sm-2 col-xs-4 nota">
                  <p>Puntuación:</p>
                  <input class="col-sm-9 col-xs4"   [(ngModel)]="nota">
                </div>
              </div>
              <button (click)="enviarcomentario()" id="btn_enviar" class="col-sm-2 col-xs-12">Enviar</button>
              <div *ngIf="error" class="msg_error"><p >Debe introducir una puntuación entre 1 y 10</p></div>
            </div>
          </div>
        </div>
        </div>

    </div>
  `,
  directives: [comentarioscomponent]
})

export class informacionprod implements OnInit{
  producto: infodetalle[];
  aux_tipoprod: number;
  aux_id:number;
  comentarios:comentario[];
  visible: boolean =  false;
  respuesta:string;
  nota:number;
  resp_comentario:comentario;
  error:boolean =false;

  seguir:boolean =false;
  favorito:boolean =false;
  logeado:boolean = true;
  id_user=1;

  sesion:Sesion;
  aux_prod:Prod;


  constructor (private router: Router,private UsuarioService: UsuarioService,private SesionService: SesionService,private clasesservice: clasesservice,private _routeParams: RouteParams){}
  AddSeguir(info:infodetalle){
    this.seguir=!this.seguir;
    if(this.seguir){
      this.UsuarioService.addContenido(this.aux_prod,this.sesion.id);
    } else {
      this.UsuarioService.removeContenido(this.aux_prod,this.sesion.id);
    }
    console.log(info.id);
  }

  getsesion(){
    this.SesionService.getSesion().then(login => {
      this.sesion=login;
      console.log(this.sesion.usuario);
    });
  }
  getProducto(){
    let id = +this._routeParams.get('idprod');
    let tipoprod = +this._routeParams.get('tipoprod');
    this.clasesservice.getinfo(id).then(prod =>{
      this.producto = prod} );
    this.aux_tipoprod=tipoprod;
    this.aux_id=id;
  }
  getcomentarios(){
    let id = +this._routeParams.get('idprod');
    this.clasesservice.getcomentarios(id).then( list => this.comentarios = list);
  }
  ngOnInit() {
    this.getProducto();
    this.getcomentarios();
    this.getsesion();
    this.clasesservice.getProd(this.aux_id).then(prod => this.aux_prod=prod[0]);

    this.visible=true;
  }
  enviarcomentario(){
    console.log(this.sesion.usuario);
    if(this.nota>10 || this.nota<0){
      this.error=true;
    } else {
      this.resp_comentario = {
        idcomentario:this.sesion.id,
        idjuego:this.aux_id,
        idcontenido:0,
        user:this.sesion.usuario,
        user_img:this.sesion.imagen,
        fecha:"Hoy",
        puntuacion:this.nota,
        mensaje:this.respuesta
      };
      this.clasesservice.pushRespuesta(this.resp_comentario);
      this.getcomentarios();
      console.log(this.resp_comentario.puntuacion);
    }
  }
}