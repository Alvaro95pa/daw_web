System.register(['angular2/core', './contenido.service', './clases.service', './sesion.service', 'angular2/router', './comentarios.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, contenido_service_1, clases_service_1, sesion_service_1, router_1, comentarios_component_1;
    var NoticiaDetails;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (contenido_service_1_1) {
                contenido_service_1 = contenido_service_1_1;
            },
            function (clases_service_1_1) {
                clases_service_1 = clases_service_1_1;
            },
            function (sesion_service_1_1) {
                sesion_service_1 = sesion_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (comentarios_component_1_1) {
                comentarios_component_1 = comentarios_component_1_1;
            }],
        execute: function() {
            NoticiaDetails = (function () {
                function NoticiaDetails(_sesionService, _contentService, _clasesService, _routeParams) {
                    this._sesionService = _sesionService;
                    this._contentService = _contentService;
                    this._clasesService = _clasesService;
                    this._routeParams = _routeParams;
                    this.visible = false;
                    this.visible_usuario = false;
                }
                NoticiaDetails.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    this._contentService.getContenidoId(id).subscribe(function (contenido) {
                        _this.contenido = contenido,
                            _this.visible = true;
                    });
                    this.getComentarios();
                    this.getsesion();
                };
                NoticiaDetails.prototype.getComentarios = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    this.aux_id = id;
                    this._clasesService.getcomentariosContenido(id).subscribe(function (list) { return _this.comentarios = list; });
                };
                NoticiaDetails.prototype.getsesion = function () {
                    var _this = this;
                    this.loged = this._sesionService.getLogged();
                    this._sesionService.getSesion().then(function (actual) {
                        _this.usr = actual,
                            _this.visible_usuario = true;
                    });
                };
                NoticiaDetails.prototype.enviarcomentario = function () {
                    this.resp_comentario = {
                        idjuego: 0,
                        idcontenido: this.contenido.id,
                        user: this.usr.usuario,
                        user_img: this.usr.imagen.url,
                        fecha: "Hoy",
                        puntuacion: 0,
                        mensaje: this.respuesta
                    };
                    this.contenido.comentarios.push(this.resp_comentario);
                    this._contentService.actualizarContenido(this.contenido).subscribe(function (cont) {
                        console.log("Hecho");
                    });
                };
                NoticiaDetails = __decorate([
                    core_1.Component({
                        selector: 'noticia-detalles',
                        templateUrl: 'app/noticia-detail.component.html',
                        providers: [contenido_service_1.ContenidoService, clases_service_1.clasesservice],
                        directives: [comentarios_component_1.comentarioscomponent]
                    }), 
                    __metadata('design:paramtypes', [sesion_service_1.SesionService, contenido_service_1.ContenidoService, clases_service_1.clasesservice, router_1.RouteParams])
                ], NoticiaDetails);
                return NoticiaDetails;
            }());
            exports_1("NoticiaDetails", NoticiaDetails);
        }
    }
});
//# sourceMappingURL=noticia-detail.component.js.map