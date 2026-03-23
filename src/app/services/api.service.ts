import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private API_URL = 'http://localhost:8080/api';
 
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
 
  // ========== CloudPlatforms ==========
  getPlatforms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/platforms`);
  }
  
  getActivePlatforms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/platforms/active`);
  }
  
  // ========== TechDomains ==========
  getDomains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/domains`);
  }
  
  getActiveDomains(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/domains/active`);
  }
  
  searchDomains(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/domains/search?name=${name}`);
  }
  
  // ========== Technologies ==========
  getTechnologies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/technologies`);
  }
  
  getTechnologyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/technologies/${id}`);
  }
  
  getTechnologiesByIds(ids: number[]): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/technologies?ids=${ids.join(',')}`);
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
  
  // ========== Rules (Matriz) ==========
  getAllRules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/rules`);
  }
  
  getTechnologiesWithRules(appType: string, platform: string, domain: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/rules/search`, {
      params: {
        appType: appType,
        platform: platform,
        domain: domain
      }
    });
  }
}