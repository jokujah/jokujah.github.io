import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-portal-reports-list',
  templateUrl: './supplier-portal-reports-list.component.html',
  styleUrls: ['./supplier-portal-reports-list.component.scss']
})
export class SupplierPortalReportsListComponent implements OnInit {

  reportsList  = [
    {
      "name":'Suspended Providers Report',
      "route":'suspended-providers-report'
    }
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/supplier-portal/${reportName}`])
  }

}
