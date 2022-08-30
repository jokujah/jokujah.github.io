import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-reports-list',
  templateUrl: './evaluation-reports-list.component.html',
  styleUrls: ['./evaluation-reports-list.component.scss']
})
export class EvaluationReportsListComponent implements OnInit {

  reportsList  = [
    {
      "name":'Due Diligence Report',
      "route":'due-diligence-report'
    },
    {
      "name":'Cancelled Tender Report',
      "route":'cancelled-tender-report'
    } 
    
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/evaluation/${reportName}`])
  }

}
