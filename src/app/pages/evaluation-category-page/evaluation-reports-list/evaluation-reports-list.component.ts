import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluation-reports-list',
  templateUrl: './evaluation-reports-list.component.html',
  styleUrls: ['./evaluation-reports-list.component.scss']
})
export class EvaluationReportsListComponent implements OnInit {

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
