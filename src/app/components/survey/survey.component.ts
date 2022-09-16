import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {

  public form = {
    email: '',
    age: '',  
    sex: '',
    socialMedia: '',
    timeFb: '',
    timeWs: '',
    timeTw: '',
    timeIg: '',
    timeTik: '',
  }

  constructor(private router: Router) {

  }
  title = 'prueba-encuesta';
  public completed = false;


  formData = ''

  localFormSave() {
    console.log(this.form)
    //this.form.timeFb = parseInt(this.form.timeFb)
    localStorage.setItem('completedForm', JSON.stringify(this.form));
    this.completed = true;
  }

  public redirectStatistics(): void {
    this.router.navigate(['/estadisticas']);
  }

}
