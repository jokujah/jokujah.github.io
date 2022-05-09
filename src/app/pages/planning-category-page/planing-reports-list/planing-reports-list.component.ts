import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-planing-reports-list',
  templateUrl: './planing-reports-list.component.html',
  styleUrls: ['./planing-reports-list.component.scss']
})
export class PlaningReportsListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClickReport(reportName:string){
    this.router.navigate([`../dashboard/planning/${reportName}`])
  }

}
