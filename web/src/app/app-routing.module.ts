import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DeputadosComponent} from './pages/deputados/deputados.component';
import {DeputadoViewComponent} from './pages/deputado-view/deputado-view.component';
import {HomeComponent} from './pages/home/home.component';
import {SobreComponent} from './pages/sobre/sobre.component';
import {QuizComponent} from './pages/quiz/quiz.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'deputadas', component: DeputadosComponent },
  { path: 'deputadas/:id/view', component: DeputadoViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
