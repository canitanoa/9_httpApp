import {Headers, Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { Heroe } from "app/interfaces/heroe.interface";
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  heroesURL = "https://httpapp-bd18c.firebaseio.com/heroes.json";
  heroeURL = "https://httpapp-bd18c.firebaseio.com/heroes";

  private body:string;
  private headers;

  constructor(private http:Http) { }

  obtenerParametrosPeticionHttp(heroe){
      this.body = JSON.stringify(heroe);
      this.headers = new Headers({'Content-Type':'application/json'});
      console.log("Service: " + this.body);
  }

  getHeroe( key$:string ){

    let headers = new Headers({'Content-Type':'application/json'});
    let query =  `/${key$}.json`;
    let url = this.heroeURL + query;
    console.log(url);

    return this.http.get( url,headers )
      .map( res => {
          console.log(res.json());
          return res.json();
        })
  }

  getHeroes(){
    let headers = new Headers({'Content-Type':'application/json'});
    console.log(headers);
    return this.http.get( this.heroesURL,headers )
      .map( res => {
          console.log("JSON: " + res.json());
          return res.json();
        })
  }

  nuevoHeroe( heroe:Heroe ){

      this.obtenerParametrosPeticionHttp(heroe);

      return this.http.post(this.heroesURL, this.body, {headers:this.headers})
        .map( res=> {
          console.log(res.json());
          return res.json();
        })
  }

  actualizarHeroe( heroe:Heroe, key$:string ){

      this.obtenerParametrosPeticionHttp(heroe);
      let url = `${ this.heroeURL }/${ key$ }.json`; 
    
      return this.http.put(url, this.body, {headers:this.headers})
        .map( res=> {
          console.log(res.json());
          return res.json();
        })
}

  eliminarHeroe( key$:string ){

      let url = `${ this.heroeURL }/${ key$ }.json`; 

      return this.http.delete(url)
        .map( res=> {
          console.log(res.json());
          return res.json();
        })

  }


  

}
