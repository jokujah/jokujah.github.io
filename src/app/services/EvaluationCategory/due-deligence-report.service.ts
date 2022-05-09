import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DueDeligenceReportService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // downloadReport(data: any): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/detailed-reports/forecast/download?fy[]=2020-2021&pde[]=Ministry+of+Finance`, data);
  // }


  downloadReport(reportName,data): Observable<Blob> {
    return this.http.get( `${this.apiUrl}/api/detailed-reports/${reportName}/download?fy[]=2020-2021&pde[]=Ministry+of+Finance` , {responseType: 'blob'})    
  }

  getSummaryStats(reportName,financialYear,procuringEntity): Observable<any> {
    return this.http.get( `${this.apiUrl}/api/summary-stats/${reportName}?fy[]=${financialYear}`)    
  }

  getSummaryStatsBids(reportName): Observable<any> {
    return this.http.get( `${this.apiUrl}/api/summary-stats/${reportName}`)    
  }

  getEvaluationBidsByProvider(reportName,financialYear,procuringEntity): Observable<any> {
    return this.http.get( `${this.apiUrl}/api/summary-stats/${reportName}?fy[]=${financialYear}&pde[]=${procuringEntity}`)    
  }
}
