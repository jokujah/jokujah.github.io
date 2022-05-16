import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  reportName

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.reportName = this.route.snapshot.paramMap.get('reportURL');
  }

  ngOnInit(): void {}

}
