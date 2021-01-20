import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TrainingAndGameComponent } from './training-and-game/training-and-game.component';
import { PacksComponent } from './packs/packs.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AuthComponent } from './auth/auth.component';
//import { AuthGuard } from './auth/auth.guard';
import { CreatePackComponent } from './create-pack/create-pack.component';
import { GamelistComponent } from './gamelist/gamelist.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { TrainingComponent } from './training/training.component';
import { WsgameComponent } from './wsgame/wsgame.component';
import { WsgameGuard } from './/wsgame/wsgame.guard';

const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'training_and_game', component: TrainingAndGameComponent/*, canActivate: [AuthGuard]*/ },
    { path: 'auth', component: AuthComponent },
    { path: 'packs/create', component: CreatePackComponent },
    { path: 'packs', component: PacksComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'training/:name', component: TrainingComponent },
    { path: 'statistics', component: StatisticsComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'Games', component: GamelistComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'Games/Creategame', component: CreateGameComponent, /*canActivate: [AuthGuard]*/ },
    { path: 'Games/:id', component: WsgameComponent, canActivate: [WsgameGuard] }
    
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
