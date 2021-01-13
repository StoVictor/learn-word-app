import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TrainingAndGameComponent } from './training-and-game/training-and-game.component';
import { PacksComponent } from './packs/packs.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CreatePackComponent } from './create-pack/create-pack.component';
import { TrainingComponent } from './training/training.component';


const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'training_and_game', component: TrainingAndGameComponent, canActivate: [AuthGuard] },
    { path: 'auth', component: AuthComponent },
    { path: 'packs/create', component: CreatePackComponent },
    { path: 'packs', component: PacksComponent },
    { path: 'training/:name', component: TrainingComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
