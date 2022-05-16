import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revenue-sources-reports-list',
  templateUrl: './revenue-sources-reports-list.component.html',
  styleUrls: ['./revenue-sources-reports-list.component.scss']
})
export class RevenueSourcesReportsListComponent implements OnInit {

  reportsList  = [
    {
      "name":'Revenue Report',
      "route":'revenue-report'
    }
    
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/revenue-report/${reportName}`])
  }

}
