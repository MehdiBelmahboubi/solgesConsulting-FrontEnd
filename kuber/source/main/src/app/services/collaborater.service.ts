import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Collaborater } from 'app/models/collaborater.model';
import { AppConfig, CONFIG_TOKEN } from "@config/config";
import { LocalStorageService } from './storage/local-storage.service';
import { Page } from 'app/models/page.models';

@Injectable({
  providedIn: 'root'
})
export class CollaboraterService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Collaborater[]> = new BehaviorSubject<Collaborater[]>(
    []
  );

  dialogData!: Collaborater;
  constructor(private httpClient: HttpClient,
    @Inject(CONFIG_TOKEN) private appConfig: AppConfig,
    private localStorageService: LocalStorageService) {
    super();
  }
  get data(): Collaborater[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getByComany( page: number, size: number): Observable<Page<Collaborater>> {
    let id = this.localStorageService.getCurrentCompany()?.id.toString();
    let param = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    if (id) {
      param = param.set('id', id);
    }
    return this.httpClient.get<Page<Collaborater>>(`${this.appConfig.apiUrl}/collaborater/getAll`,{params : param});
  }

  getById(id:number): Observable<Collaborater> {
    let param = new HttpParams();
    param = param.set('id',id);
    return this.httpClient.get<Collaborater>(`${this.appConfig.apiUrl}/collaborater/get`,{params : param});
  }

  getArchived(page: number, size: number): Observable<Page<Collaborater>>{
    let id = this.localStorageService.getCurrentCompany()?.id.toString();
    let param =  new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    if (id) {
      param = param.set('id', id);
    }
    return this.httpClient.get<Page<Collaborater>>(`${this.appConfig.apiUrl}/collaborater/getArchived`,{params : param});
  }
  /** CRUD METHODS */

  addCollaborateur(collaborater: Collaborater): Observable<any> {
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      collaborater.company_id = companyId;
      return this.httpClient.post(`${this.appConfig.apiUrl}/collaborater/add`, collaborater);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }

  editCollaborateur(collaborater:Collaborater): Observable<any> {
    return this.httpClient.put(`${this.appConfig.apiUrl}/collaborater/update`, collaborater);
  }

  deleteCollaborater(id:number){
    let param = new HttpParams();
    param = param.set('id',id);
    return this.httpClient.delete(`${this.appConfig.apiUrl}/collaborater/delete`,{params : param});
  }
}
