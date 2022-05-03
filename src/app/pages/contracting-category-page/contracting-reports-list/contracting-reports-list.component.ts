import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contracting-reports-list',
  templateUrl: './contracting-reports-list.component.html',
  styleUrls: ['./contracting-reports-list.component.scss']
})
export class ContractingReportsListComponent implements OnInit {

  reportsList  = [
    {
      "name":'Administrative Review Report',
      "route":'administrative-review-report'
    },
    {
      "name":'Awarded Contract Report',
      "route":'awarded-contract-report'
    },
    {
      "name":'PDE Average Contract Value Report',
      "route":'pde-average-contract-value-report'
    },
    {
      "name":'Procurement Method Average Contract Value Report',
      "route":'procurement-method-average-contract-value-report'
    },
    {
      "name":'Procurement Report',
      "route":'procurement-report'
    },
    {
      "name":'Signed Contract Report',
      "route":'signed-contracts-report'
    }
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/contracting/${reportName}`])
  }

}