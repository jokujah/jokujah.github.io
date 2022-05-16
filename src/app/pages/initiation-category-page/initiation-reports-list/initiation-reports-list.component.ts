import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initiation-reports-list',
  templateUrl: './initiation-reports-list.component.html',
  styleUrls: ['./initiation-reports-list.component.scss']
})
export class InitiationReportsListComponent implements OnInit {

  reportsList  = [
    {
      "name":'Late Initiation Report',
      "route":'late-initiation-report'
    }
    
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/initiation/${reportName}`])
  }

}
