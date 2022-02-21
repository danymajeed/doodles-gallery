import { environment } from './../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { Filters } from './gallery/gallery.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  private setHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      `Bearer ${this.localStorageService.getToken()}`
    );
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  logIn(authData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, authData);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user/${id}`, data, {
      headers: this.setHeaders(),
    });
  }

  getUserDoodles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/doodles/user`, {
      headers: this.setHeaders(),
    });
  }

  getDoodles(page: number, limit: number, filers: Filters): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    params = params.append('search', filers.search);
    params = params.append('type', filers.type);

    const options = {
      params: params,
      headers: this.setHeaders(),
    };

    return this.http.get<any>(`${this.apiUrl}/doodles`, options);
  }
}
