import {HeroesComponent} from './components/heroes/heroes.component';
import {RouterModule, Routes} from '@angular/router';
import { HeroeComponent } from "app/components/heroes/heroe.component";
import { AliasComponent } from "app/components/alias/alias.component";

const APP_ROUTES: Routes = [
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: 'alias/:id', component: AliasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'heroes' }];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);