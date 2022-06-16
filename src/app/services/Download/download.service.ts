import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpRequest } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Saver, SAVER } from 'src/app/utils/saver.provider'
import { download, Download } from 'src/app/utils/download'
import { environment } from 'src/environments/environment'

@Injectable({providedIn: 'root'})
export class DownloadService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(SAVER) private save: Saver
  ) {}

  download(filename,reportName,pde,financialYear): Observable<Download> {
    
    let roles = localStorage.getItem('isSuperAdmin') == 'true'?'super-admin':'pde-admin'

    let checkIfPdeOrDept = (roles == 'super-admin') ? 'pde' : 'dept'



    if((financialYear === "") && (pde !== ""))
    {
      return this.http.get(`${this.apiUrl}/api/detailed-reports/${reportName}/download?${checkIfPdeOrDept}[]=${pde}`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      }).pipe(download(blob => this.save(blob, filename)))
    }
    else if((financialYear !== "") && (pde === ""))
    {
      return this.http.get(`${this.apiUrl}/api/detailed-reports/${reportName}/download?fy[]=${financialYear}`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      }).pipe(download(blob => this.save(blob, filename))) 
    }
    else if((financialYear !== "") && (pde !== "")){
      return this.http.get(`${this.apiUrl}/api/detailed-reports/${reportName}/download?fy[]=${financialYear}&${checkIfPdeOrDept}[]=${pde}`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      }).pipe(download(blob => this.save(blob, filename)))
    }
    else
    {
      
      return this.http.get(`${this.apiUrl}/api/detailed-reports/${reportName}/download`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      }).pipe(download(blob => this.save(blob, filename)))

    }
  
  }


  blob(url: string, filename?: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
}