import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/verify-user-credentials';

  constructor(private http: HttpClient) { }

  verifyUserCredentials(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.get<any>(this.apiUrl, { params });
  }
  
  private registers= 'http://localhost:3000/api/v1';

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.registers}/register`, user);
  }
}
