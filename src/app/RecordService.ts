import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private apiUrl = '/records';

  constructor(private http: HttpClient) {}

  saveRecord(record: any): Observable<any> {
    return this.http.post(this.apiUrl, record);
  }
  
  getRecords(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getRecordsByEmail(email: string): Observable<User[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<User[]>(this.apiUrl, { params });
  }

  updateRecord(email: string | number, record: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${email}`, record);
  }

  deleteRecord(email: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${email}`);
  }
  
}
 