import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Heroe } from 'app/interfaces/heroe.interface';
import { HeroesService } from 'app/services/heroes.service';
import { AliasComponent } from 'app/components/alias/alias.component';
import { NgForm } from '@angular/forms/src/forms';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent implements OnInit {

  public result: any;
  @ViewChild('modalAlias') modalAlias: AliasComponent;

  heroe: Heroe = {
    nombre: '',
    bio: '',
    casa: 'Marvel'
  };

  nuevo = false;
  id: string;

  constructor(private _heroesService: HeroesService, private router: Router,
              private activatedRoute: ActivatedRoute) {

    // Para obtener el parametro de la url:
    this.activatedRoute.params.subscribe(parametros => {
        console.log(parametros);
        this.id = parametros['id'];
        if (this.id !== 'nuevo') {
          this.obtenerHeroe(this.id);
        }

    });
  }

  ngOnInit() {
  }

  showALiasModal() {
      this.modalAlias.show();
  }

  obtenerHeroe( id: string ) {
     this._heroesService.getHeroe( id )
      .subscribe( data => { this.heroe = data; });
  }

  agregarNuevo( forma: NgForm ) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: 'Marvel'
    });
  }

  guardar() {
      if ( this.id === 'nuevo' ) {
        // Insertando:
        this.insertar();
      }else {
        // Actualizando:
        this.actualizar();
      }
  }

  insertar() {
    this._heroesService.nuevoHeroe( this.heroe )
      .subscribe(data => {
        this.router.navigate(['/heroe', data.name]);
      }, error => console.error(error));
  }

  actualizar() {
    this._heroesService.actualizarHeroe( this.heroe, this.id )
      .subscribe(data => {
        console.log(data);
      }, error => console.error(error));
  }

}
