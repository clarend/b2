import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { QuestionComponent } from './question/question.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'new_question', component: QuestionComponent},
  {path: 'home/:result', component: HomeComponent},
  {path: 'home/:score', component: HomeComponent},
  {path: 'play', component: GameComponent},
  {path: 'log_out', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
