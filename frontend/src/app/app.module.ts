import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TrainingAndGameComponent } from './training-and-game/training-and-game.component';
import { AppRoutingModule } from './app-routing.module';
import { PacksComponent } from './packs/packs.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { CreatePackComponent } from './create-pack/create-pack.component';
import { TrainingComponent } from './training/training.component';
import { WsgameComponent } from './wsgame/wsgame.component';
import { WsgameGuard } from './wsgame/wsgame.guard';
import { StatisticsComponent } from './statistics/statistics.component';
import { GamelistComponent } from './gamelist/gamelist.component';
import { CreateGameComponent } from './create-game/create-game.component';

import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TrainingAndGameComponent,
    PacksComponent,
    AuthComponent,
    TrainingComponent,
    CreatePackComponent,
    WsgameComponent,
    StatisticsComponent,
    GamelistComponent,
    CreateGameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule,
    MatRadioModule,
    FormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GraphQLModule,
    MatCheckboxModule
  ],
  providers: [
    AuthService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true 
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://127.0.0.1:5000/graphql'
          })
        }
      },
      deps: [HttpLink]
    },
    WsgameGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
