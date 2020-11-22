import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TrainingAndGameComponent } from './training-and-game/training-and-game.component';
import { PacksComponent } from './packs/packs.component';

const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'training_and_game', component: TrainingAndGameComponent },
    { path: 'packs', component: PacksComponent }
]

@NgModule({
   imports: [RouterModule.forRoot(appRoutes)],
     exports: [RouterModule]
})
export class AppRoutingModule {

}
