import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ========== AppTypes ==========
  getAppTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/app-types`);
  }

  getActiveAppTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/app-types/active`);
  }

  createAppType(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/app-types`, data);
  }

  updateAppType(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/app-types/${id}`, data);
  }

  deleteAppType(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/app-types/${id}`);
  }

  // ========== Platforms ==========
  getPlatforms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/platforms`);
  }

  getActivePlatforms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/platforms/active`);
  }

  // ========== Domains ==========
  getDomains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/domains`);
  }

  getActiveDomains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/domains/active`);
  }

  searchDomains(name: string): Observable<any[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<any[]>(`${this.API_URL}/domains/search`, { params });
  }

  // ========== Technologies ==========
  getTechnologies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/technologies`);
  }

  getTechnologyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/technologies/${id}`);
  }

  getTechnologiesByIds(ids: number[]): Observable<any[]> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.get<any[]>(`${this.API_URL}/technologies`, { params });
  }

  createTechnology(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/technologies`, data);
  }

  updateTechnology(id: number, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/technologies/${id}`, data);
  }

  deleteTechnology(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/technologies/${id}`);
  }

  // ========== Rules ==========
  getAllRules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/rules`);
  }

  getTechnologiesWithRules(appType: string, platform: string, domain: string): Observable<any[]> {
    const params = new HttpParams()
      .set('appType', appType)
      .set('platform', platform)
      .set('domain', domain);

    return this.http.get<any[]>(`${this.API_URL}/rules/search`, { params });
  }
}