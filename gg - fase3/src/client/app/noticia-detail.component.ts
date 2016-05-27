import {Component, OnInit} from 'angular2/core';
import {Contenido} from './contenido.model';
import {ContenidoService} from './contenido.service';
import {clasesservice} from './clases.service';
import {SesionService} from './sesion.service';
import { RouteParams } from 'angular2/router';
import {Prod,comentario} from './clases';
import {Usuario} from './usuario.model';
import {comentarioscomponent} from './comentarios.component';

@Component({
  selector: 'noticia-detalles',
  templateUrl: 'app/noticia-detail.component.html',
  providers: [ContenidoService, clasesservice],
  directives: [comentarioscomponent]
})

export class NoticiaDetails implements OnInit{
  contenido: Contenido;
  visible: boolean = false;
  producto: Prod;
  comentarios:comentario[];
  resp_comentario:comentario;
  loged:boolean;
  usr: Usuario;
  aux_id:number;
  respuesta:string;

  constructor(private SesionService: SesionService,private _contentService: ContenidoService, private _clasesService: clasesservice,
    private _routeParams: RouteParams) {}

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._contentService.getContenidoId(id).subscribe(contenido =>{
      this.contenido = contenido;
      this.visible = true;
      this._clasesService.getProdNombre(this.contenido.nombreProd).subscribe(producto =>{
        this.producto = producto;
      })
    });
    this.getComentarios();
    this.getsesion();
  }

  getComentarios(){
    let id = +this._routeParams.get('id');
    this.aux_id=id;
    this._clasesService.getcomentariosContenido(id).subscribe( list => this.comentarios = list);
  }
  getsesion(){
    this.loged = this.SesionService.getLogged();
    this.usr = this.SesionService.getSesion();
  }

  enviarcomentario(){
    this.resp_comentario = {
      idcomentario:this.usr.id,
      idjuego:0,
      idcontenido:this.aux_id,
      user:this.usr.usuario,
      user_img:this.usr.imagen.url,
      fecha:"Hoy",
      puntuacion:0,
      mensaje:this.respuesta
    };
    this.contenido.comentario.push(this.resp_comentario);
    this._contentService.actualizarContenido(this.contenido);
  }
}
