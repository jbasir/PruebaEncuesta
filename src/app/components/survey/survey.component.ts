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
    const result = localStorage.getItem('completedForm')
    let finalLocalRegisters = '';
    if(result && result != null){
      finalLocalRegisters = result + ',' + JSON.stringify(this.form)
    }else{
      finalLocalRegisters = JSON.stringify(this.form)
    }

    localStorage.setItem('completedForm', finalLocalRegisters);
    this.completed = true;
  }

  public redirectStatistics(): void {
    this.router.navigate(['/estadisticas']);
  }

}
