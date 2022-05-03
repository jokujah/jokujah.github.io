import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-management-reports-list',
  templateUrl: './contract-management-reports-list.component.html',
  styleUrls: ['./contract-management-reports-list.component.scss']
})
export class ContractManagementReportsListComponent implements OnInit {

  reportsList  = [
    {
      "name":'Cancelled Tender Report',
      "route":'cancelled-tender-report'
    },
    {
      "name":'Completed Contracts Report',
      "route":'completed-contracts-report'
    },
    {
      "name":'Frame Work Report',
      "route":'frame-work-report'
    },
    {
      "name":'Terminated Contracts Report',
      "route":'terminated-contracts-report'
    }
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/contract-management/${reportName}`])
  }

}
