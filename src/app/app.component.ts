import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appService: AppService) {

  }
  title = 'prueba-encuesta';
  public registers: any;
  form = {
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

  formData = ''

  localFormSave() {
    localStorage.setItem('completedForm', JSON.stringify(this.form))
  }


  onRegister() {
    console.log(this.form)
    this.localFormSave();
    this.appService.getRegister().subscribe((res: any) => {
      this.registers = res;
      console.log(this.registers)
    })
  }

}
