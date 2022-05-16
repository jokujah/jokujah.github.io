import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitation-reports-list',
  templateUrl: './solicitation-reports-list.component.html',
  styleUrls: ['./solicitation-reports-list.component.scss']
})
export class SolicitationReportsListComponent implements OnInit {

  reportsList  = [
    {
      "name":'PDE Bid Average Report',
      "route":'pde-bid-average-report'
    }
    
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/solicitation/${reportName}`])
  }

}
