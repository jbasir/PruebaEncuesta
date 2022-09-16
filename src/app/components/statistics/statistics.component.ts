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
  public moreUsed = {
    "facebook": '',
    "whatsapp": '',
    "twitter": '',
    "instagram": '',
    "tiktok": '',
  }
  

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
      this.getRanges()
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

  //• Rango de edad que más use cada red social (ejemplo: Facebook entre 18-25 e Instagram entre 26-33)

  getRanges() {
    let objects26 = this.registers.filter (obj => {
      return obj.age == "26 - 33";
    })

    let objects18 = this.registers.filter (obj => {
      return obj.age == "18 - 25";
    })

    let objects34 = this.registers.filter (obj => {
      return obj.age == "34 - 40";
    })

    let objects40 = this.registers.filter (obj => {
      return obj.age == "40+";
    })
    
    let time26 = {
      "timeFb": 0,
      "timeIg": 0,
      "timeTik": 0,
      "timeTw": 0,
      "timeWs": 0
    }
    Object.keys(objects26).forEach( key => {
      time26['timeFb'] = time26['timeFb'] + objects26[key]['timeFb'];
      time26['timeIg'] = time26['timeIg'] + objects26[key]['timeIg'];
      time26['timeTik'] = time26['timeTik'] + objects26[key]['timeTik'];
      time26['timeTw'] = time26['timeTw'] + objects26[key]['timeTw'];
      time26['timeWs'] = time26['timeWs'] + objects26[key]['timeWs'];
    })

    let time18 = {
      "timeFb": 0,
      "timeIg": 0,
      "timeTik": 0,
      "timeTw": 0,
      "timeWs": 0
    }
    Object.keys(objects18).forEach( key => {
      time18['timeFb'] = time18['timeFb'] + objects18[key]['timeFb'];
      time18['timeIg'] = time18['timeIg'] + objects18[key]['timeIg'];
      time18['timeTik'] = time18['timeTik'] + objects18[key]['timeTik'];
      time18['timeTw'] = time18['timeTw'] + objects18[key]['timeTw'];
      time18['timeWs'] = time18['timeWs'] + objects18[key]['timeWs'];
    });

    let time34 = {
      "timeFb": 0,
      "timeIg": 0,
      "timeTik": 0,
      "timeTw": 0,
      "timeWs": 0
    }
    Object.keys(objects34).forEach( key => {
      time34['timeFb'] = time34['timeFb'] + objects34[key]['timeFb'];
      time34['timeIg'] = time34['timeIg'] + objects34[key]['timeIg'];
      time34['timeTik'] = time34['timeTik'] + objects34[key]['timeTik'];
      time34['timeTw'] = time34['timeTw'] + objects34[key]['timeTw'];
      time34['timeWs'] = time34['timeWs'] + objects34[key]['timeWs'];
    })

    let time40 = {
      "timeFb": 0,
      "timeIg": 0,
      "timeTik": 0,
      "timeTw": 0,
      "timeWs": 0
    }
    Object.keys(objects40).forEach( key => {
      time40['timeFb'] = time40['timeFb'] + objects40[key]['timeFb'];
      time40['timeIg'] = time40['timeIg'] + objects40[key]['timeIg'];
      time40['timeTik'] = time40['timeTik'] + objects40[key]['timeTik'];
      time40['timeTw'] = time40['timeTw'] + objects40[key]['timeTw'];
      time40['timeWs'] = time40['timeWs'] + objects40[key]['timeWs'];
    })

    this.moreUsed['facebook'] = '18 - 25';
    if(time26['timeFb'] > time18['timeFb']) this.moreUsed['facebook'] = '26 - 33';
    if(time34['timeFb'] > time18['timeFb'] && time34['timeFb'] > time26['timeFb']) this.moreUsed['facebook'] = '34 - 40';
    if(time40['timeFb'] > time18['timeFb'] && time40['timeFb'] > time26['timeFb'] && time40['timeFb'] > time34['timeFb']) this.moreUsed['facebook'] = '40+';

    this.moreUsed['instagram'] = '18 - 25';
    if(time26['timeIg'] > time18['timeIg']) this.moreUsed['instagram'] = '26 - 33';
    if(time34['timeIg'] > time18['timeIg'] && time34['timeIg'] > time26['timeIg']) this.moreUsed['instagram'] = '34 - 40';
    if(time40['timeIg'] > time18['timeIg'] && time40['timeIg'] > time26['timeIg'] && time40['timeIg'] > time34['timeIg']) this.moreUsed['instagram'] = '40+';

    this.moreUsed['whatsapp'] = '18 - 25';
    if(time26['timeWs'] > time18['timeWs']) this.moreUsed['whatsapp'] = '26 - 33';
    if(time34['timeWs'] > time18['timeWs'] && time34['timeWs'] > time26['timeWs']) this.moreUsed['whatsapp'] = '34 - 40';
    if(time40['timeWs'] > time18['timeWs'] && time40['timeWs'] > time26['timeWs'] && time40['timeWs'] > time34['timeWs']) this.moreUsed['whatsapp'] = '40+';

    this.moreUsed['tiktok'] = '18 - 25';
    if(time26['timeTik'] > time18['timeTik']) this.moreUsed['tiktok'] = '26 - 33';
    if(time34['timeTik'] > time18['timeTik'] && time34['timeTik'] > time26['timeTik']) this.moreUsed['tiktok'] = '34 - 40';
    if(time40['timeTik'] > time18['timeTik'] && time40['timeTik'] > time26['timeTik'] && time40['timeTik'] > time34['timeTik']) this.moreUsed['tiktok'] = '40+';

    this.moreUsed['twitter'] = '18 - 25';
    if(time26['timeTw'] > time18['timeTw']) this.moreUsed['twitter'] = '26 - 33';
    if(time34['timeTw'] > time18['timeTw'] && time34['timeTw'] > time26['timeTw']) this.moreUsed['twitter'] = '34 - 40';
    if(time40['timeTw'] > time18['timeTw'] && time40['timeTw'] > time26['timeTw'] && time40['timeTw'] > time34['timeTw']) this.moreUsed['twitter'] = '40+';

    console.log(time18, time26, time34, time40)
  }
}

  


