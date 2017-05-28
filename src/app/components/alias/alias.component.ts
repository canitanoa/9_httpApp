import {ActivatedRoute} from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {HeroesService} from '../../services/heroes.service';
import {Heroe} from '../../interfaces/heroe.interface';
import {ModalComponent} from '../../modal/modal.component';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styles: []
})
export class AliasComponent implements OnInit {

  @ViewChild('modal1') modal: ModalComponent;
  heroe: Heroe;
  id: string;

  constructor(private _heroesService: HeroesService, private activatedRoute: ActivatedRoute) {

    // Para obtener el parametro de la url:
    this.activatedRoute.params.subscribe(parametros => {
        console.log(parametros);
        this.id = parametros['id'];
        alert(this.id);
        if (this.id !== 'nuevo') {
          this.obtenerHeroe(this.id);
        }
    });
  }

  ngOnInit() {
  }

  obtenerHeroe( id: string ) {
     this._heroesService.getHeroe( id )
      .subscribe( data => {
        this.heroe = data;
        alert(this.heroe.nombre);
      });
  }

  public show(): void {
    alert(this.heroe.nombre);
    this.modal.show();
  }

  public hide(): void {
    this.modal.hide();
  }
}
