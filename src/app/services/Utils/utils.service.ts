import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUtil(utilityName): Observable<any> {
    return this.http.get( `${this.apiUrl}/api/utilities/${utilityName}`)    
  }
}
