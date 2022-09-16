import { Component, OnInit } from '@angular/core';
// import { ConsoleReporter } from 'jasmine';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent  implements OnInit{
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

   colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

  public registers : any;
  public numberSurveys : any;
  public arrayPlusAvgFb: any;
  public arrayPlusAvgWs: any;
  public arrayPlusAvgTw: any;
  public arrayPlusAvgIg: any;
  public arrayPlusAvgTik: any;
  public chartResults1: any;
  

  constructor(private statisticsService: StatisticsService) {

  }

  ngOnInit(): void {
    this.getSurvey();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getSurvey() : void {
    this.statisticsService.getRegister().subscribe((res: any) => {
      this.registers = res;
      let localRegisters = localStorage.getItem('completedForm');
      if(localRegisters) {
        localRegisters = JSON.parse(localRegisters);
        if( localRegisters !== null){
          // Corvirtiendo campos a numeros
          localRegisters['timeFb'] = parseInt(localRegisters['timeFb']);
          localRegisters['timeWs'] = parseInt(localRegisters['timeWs']);
          localRegisters['timeTw'] = parseInt(localRegisters['timeTw']);
          localRegisters['timeIg'] = parseInt(localRegisters['timeIg']);
          localRegisters['timeTik'] = parseInt(localRegisters['timeTik']);
        }
      }
      this.registers.push(localRegisters);
      console.log('final', this.registers)
      this.amountSurveys();
      this.favSocialMedia()
      this.socialMediaReport()
      this.socialMediaTimeFb()
      this.socialMediaTimeWs()
      this.socialMediaTimeTw()
      this.socialMediaTimeIg()
      this.socialMediaTimeTik()
      this.getRange26()
    })
  }

  //• Cantidad de encuestas respondidas

  amountSurveys() : void {
    this.numberSurveys = this.registers.length;
  }

  //• Tiempo promedio por red social
  
  //Facebook AVG
  socialMediaTimeFb() : void {
    let arrayH  = this.registers.map(item => item.timeFb);
    let lengthH = this.registers.length;
    let arrayPlusH = 0;
    for (let i = 0; i < arrayH.length; i++) {
    arrayPlusH = arrayPlusH + arrayH[i];
     }
     let arrayPlusAvg = (arrayPlusH / lengthH)
     this.arrayPlusAvgFb = arrayPlusAvg.toFixed(1)
    }
  
  //Whastapp AVG
  socialMediaTimeWs() : void {
    let arrayH  = this.registers.map(item => item.timeWs);
    let lengthH = this.registers.length;
    let arrayPlusH = 0;
    for (let i = 0; i < arrayH.length; i++) {
    arrayPlusH = arrayPlusH + arrayH[i];
      }
      let arrayPlusAvg = (arrayPlusH / lengthH)
      this.arrayPlusAvgWs = arrayPlusAvg.toFixed(1)
    }

  //Twitter AVG
  socialMediaTimeTw() : void {
    let arrayH  = this.registers.map(item => item.timeTw);
    let lengthH = this.registers.length;
    let arrayPlusH = 0;
    for (let i = 0; i < arrayH.length; i++) {
    arrayPlusH = arrayPlusH + arrayH[i];
     }
     let arrayPlusAvg = (arrayPlusH / lengthH)
     this.arrayPlusAvgTw = arrayPlusAvg.toFixed(1)
    }

  //Instagram AVG
  socialMediaTimeIg() : void {
    let arrayH  = this.registers.map(item => item.timeIg);
    let lengthH = this.registers.length;
    let arrayPlusH = 0;
    for (let i = 0; i < arrayH.length; i++) {
    arrayPlusH = arrayPlusH + arrayH[i];
     }
     let arrayPlusAvg = (arrayPlusH / lengthH)
     this.arrayPlusAvgIg = arrayPlusAvg.toFixed(1)
    } 

    //Tiktok AVG
  socialMediaTimeTik() : void {
    let arrayH  = this.registers.map(item => item.timeTik);
    let lengthH = this.registers.length;
    let arrayPlusH = 0;
    for (let i = 0; i < arrayH.length; i++) {
    arrayPlusH = arrayPlusH + arrayH[i];
     }
     let arrayPlusAvg = (arrayPlusH / lengthH)
     this.arrayPlusAvgTik = arrayPlusAvg.toFixed(1)
    }  

  //• Red social favorita
  //• Red social menos querida


socialMediaArray : any = [] 
   favSocialMedia() : void {
     this.registers.forEach(item => {
      this.socialMediaArray.push(item.socialMedia);
      this.socialMediaArray.sort();

     })
     console.log('array de redes sociales', this.socialMediaArray)


   }
   rta : any;
  socialMediaReport() {
    let rta = this.registers
    .map(item => item.socialMedia)
    .reduce((rta, item) => {
      if(rta[item]) {
        rta[item] = rta[item] + 1;
      } else {
        rta[item] = 1;
      }
      return rta;
    }, {})
    this.chartResults1 = [{
      "name": "Facebook",
      "value": rta['Facebook']
    },
    {
      "name": "Whatsapp",
      "value": rta['Whatsapp']
    },
    {
      "name": "Instagram",
      "value": rta['Instagram']
    },
    {
      "name": "Tiktok",
      "value": rta['Tiktok']
    },
    {
      "name": "Twitter",
      "value": rta['Twitter']
    }

  ];
    console.log(rta)
   ;
  }

  //• Red social menos querida

  //• Rango de edad que más use cada red social (ejemplo: Facebook entre 18-25 e Instagram entre 26-33)

  objects26: any
  timeFb26: any
  getRange26() {
    let objects26 = this.registers.filter (obj => {
      return obj.age == "26 - 33";
    })
    
    console.log('ojects26',objects26);
  }
}

  


