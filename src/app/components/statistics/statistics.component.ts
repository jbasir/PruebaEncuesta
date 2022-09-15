import { Component, OnInit } from '@angular/core';
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

  registers : any;

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
      console.log(this.registers)
      let localRegisters = localStorage.getItem('completedForm');
      if(localRegisters) localRegisters = JSON.parse(localRegisters);
      console.log('local',localRegisters);
      this.registers.push(localRegisters);
      console.log('final', this.registers)
    })
  }
}
