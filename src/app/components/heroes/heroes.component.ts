import { Component, OnInit } from '@angular/core';
import { HeroesService } from "app/services/heroes.service";
import { Heroe } from "app/interfaces/heroe.interface";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes:any[] = [];
  loading:boolean = true;

  constructor(private _heroesService:HeroesService) { 
    this.obtenerHeroes();
  }

  ngOnInit() {
  }

  obtenerHeroes(){
     this._heroesService.getHeroes()
      .subscribe( data => {
        setTimeout( ()=> {
          this.loading = false;
          this.heroes = data;
        }, 1000 );
      
    });
  }

  borrarHeroe( key$:string ){
    this._heroesService.eliminarHeroe(key$)
      .subscribe( respuesta => {
        if( respuesta ){
          console.log(respuesta);
        }else{
          //todo bien
          delete this.heroes[key$];
        }
        console.log(respuesta);
    });
  }

}
