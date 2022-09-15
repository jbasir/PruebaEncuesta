import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SurveyComponent } from './components/survey/survey.component';

const routes: Routes = [
  {
    path: 'estadisticas',
    component: StatisticsComponent
  },
  {
    path: '',
    component: SurveyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
