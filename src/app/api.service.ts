import { Filters } from './gallery/gallery.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  logIn(authData: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', {
      address: authData.id,
      message: authData.data,
      signature: authData.signature,
    });
  }

  getDoodles(
    page: number,
    limit: number,
    filers: Filters,
    address: string = ''
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    params = params.append('address', address);
    params = params.append('search', filers.search);
    params = params.append('type', filers.type);

    const options = page ? { params: params } : {};
    return this.http.get<any>('http://127.0.0.1:8000/api/doodles', options);
  }
}
