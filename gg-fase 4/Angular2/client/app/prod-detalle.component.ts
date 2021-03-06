import {Component,Input} from 'angular2/core';

import {Prod} from './clases';

@Component({
  selector:'prod-detalle',
  template: `
    <a class="detalle"><div>
      <img src="images/{{prod.img.url}}">
      <p>{{prod.name}}</p>
    </div></a>
  `
})

export class proddetalleComponent{
  @Input()
  prod: Prod;
}
