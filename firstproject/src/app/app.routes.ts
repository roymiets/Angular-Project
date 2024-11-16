import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';


export const routes: Routes = 
    [
        {path: '', redirectTo: '/crisis-list', pathMatch: 'full'},
    {path: 'crisis-list', component: CrisisListComponent},
    {path: 'heroes-list', component: HeroesListComponent},
    ];
