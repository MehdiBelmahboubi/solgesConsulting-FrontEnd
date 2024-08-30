import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CONFIG_TOKEN, AppConfig } from '@config/config';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './storage/local-storage.service';
import { JourFerier } from 'app/models/jourferier.model';
import { Fete } from 'app/models/fete.model';
import { TypeFete } from 'app/models/typefete.model';

@Injectable({
  providedIn: 'root'
})
export class JourferierService extends UnsubscribeOnDestroyAdapter{
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<JourferierService[]> = new BehaviorSubject<JourferierService[]>(
    []
  );

  dialogData!: JourFerier;
  constructor(private httpClient: HttpClient,
    @Inject(CONFIG_TOKEN) private appConfig: AppConfig,
    private localStorageService: LocalStorageService) {
    super();
  }

  getAllJourFeries(statut:boolean): Observable<JourFerier[]>{
    const id = this.localStorageService.getCurrentCompany()?.id.toString();
    let param = new HttpParams()
      .set('statut',statut);
    if (id) {
      param = param.set('id', id);
    }
    return this.httpClient.get<JourFerier[]>(`${this.appConfig.apiUrl}/jourferies`, { params: param })
  }

  addJrFeries(jourferie:JourFerier):Observable<any>{
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      jourferie.companyId = companyId;
      return this.httpClient.post(`${this.appConfig.apiUrl}/jourferies`, jourferie);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }

  addFete(fete:Fete):Observable<any>{
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      fete.companyId = companyId;
      return this.httpClient.post(`${this.appConfig.apiUrl}/jourferies/fetes`, fete);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }

  addTypeFete(typeFete:TypeFete):Observable<any>{
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      typeFete.companyId = companyId;
      return this.httpClient.post(`${this.appConfig.apiUrl}/jourferies/typesFetes`, typeFete);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }

  getFetes(): Observable<Fete[]>{
    let id = this.localStorageService.getCurrentCompany()?.id.toString();
    let param = new HttpParams();
    if (id) {
      param = param.set('id', id);
    }
    return this.httpClient.get<Fete[]>(`${this.appConfig.apiUrl}/jourferies/fetes`, { params: param })
  }

  getTypesFetes(): Observable<TypeFete[]>{
    let id = this.localStorageService.getCurrentCompany()?.id.toString();
    let param = new HttpParams();
    if (id) {
      param = param.set('id', id);
    }
    return this.httpClient.get<TypeFete[]>(`${this.appConfig.apiUrl}/jourferies/typesFetes`, { params: param })
  }
}
