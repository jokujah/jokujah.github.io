import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disposal-reports-list',
  templateUrl: './disposal-reports-list.component.html',
  styleUrls: ['./disposal-reports-list.component.scss']
})
export class DisposalReportsListComponent implements OnInit {

  reportsList  = [
    {
      "name":'Disposals Report',
      "route":'disposal-report'
    }
    
  ]

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/disposal/${reportName}`])
  }

}
