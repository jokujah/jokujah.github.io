import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  reportName
  reportName2

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
  }

  ngOnInit(): void {
    this.reportName = this.route.snapshot.paramMap.get('reportURL');

    this.route.data.subscribe(data => {
      this.reportName2 = data['reportUrl'];
    })

    this.reportName = this.route.snapshot.paramMap.get('reportURL')?this.route.snapshot.paramMap.get('reportURL'):this.reportName2;
    console.log(this.reportName)
    console.log(this.route.snapshot.paramMap.get('reportURL'))
    console.log(this.reportName2)
  }

}
