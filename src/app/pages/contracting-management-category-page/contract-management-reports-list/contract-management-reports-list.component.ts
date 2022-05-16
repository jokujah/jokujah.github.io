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
      "name":'Provider Perfomance Report',
      "route":'provider-performance-report'
    },
    {
      "name":'Actual Vs Planned Procurement Report',
      "route":'actual-vs-planned-procurement-report'
    },
    {
      "name":'Completed Contracts On Time Report',
      "route":'contracts-completed-on-time-report'
    },
    {
      "name":'Procurements Awarded To Suspended Providers Report',
      "route":'procurements-awarded-to-suspended-providers-report'
    },
    {
      "name":'Contract Management Report',
      "route":'contract-management-report'
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
