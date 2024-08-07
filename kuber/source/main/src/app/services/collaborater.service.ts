import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Collaborater } from 'app/models/collaborater.model';
import { AppConfig, CONFIG_TOKEN } from "@config/config";
import { LocalStorageService } from './storage/local-storage.service';
import { Page } from 'app/models/page.models';
import { AbstractRestService } from 'app/client-sirh/shared/service/AbstractRest.service';

@Injectable({
  providedIn: 'root'
})
export class CollaboraterService extends AbstractRestService<Collaborater> {
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Collaborater[]> = new BehaviorSubject<Collaborater[]>(
    []
  );

  dialogData!: Collaborater;
  getCollaboraters: any;
  constructor(private http: HttpClient,
    @Inject(CONFIG_TOKEN) private appConfig: AppConfig,
    private localStorageService: LocalStorageService) {
    super(http, `${appConfig.apiUrl}`, "Contract",//Classification//Contract
      localStorageService.getCurrentCompany()?.id || -1, localStorageService.getUser()?.id || -1);
  }
  get data(): Collaborater[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }

  getByComany(page: number, size: number): Observable<Page<Collaborater>> {
    let id = this.localStorageService.getCurrentCompany()?.id.toString();
    let param = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (id) {
      param = param.set('id', id);
    }
    return this.httpClient.get<Page<Collaborater>>(`${this.appConfig.apiUrl}/collaborators`, { params: param });
  }

  getById(id: number): Observable<Collaborater> {
    return this.httpClient.get<Collaborater>(`${this.appConfig.apiUrl}/collaborators/${id}`);
  }

  getArchived(page: number, size: number): Observable<Page<Collaborater>> {
    let id = this.localStorageService.getCurrentCompany()?.id.toString();
    let param = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (id) {
      param = param.set('id', id);
    }
    return this.httpClient.get<Page<Collaborater>>(`${this.appConfig.apiUrl}/collaborators/archive`, { params: param });
  }
  /** CRUD METHODS */

  addCollaborateur(collaborater: Collaborater): Observable<any> {
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      collaborater.company_id = companyId;
      return this.httpClient.post(`${this.appConfig.apiUrl}/collaborators`, collaborater);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }

  editCollaborateur(collaborater: Collaborater): Observable<any> {
    return this.httpClient.put(`${this.appConfig.apiUrl}/collaborators`, collaborater);
  }

  deleteCollaborater(id: number) {
    let param = new HttpParams();
    param = param.set('id', id);
    return this.httpClient.delete(`${this.appConfig.apiUrl}/collaborators`, { params: param });
  }
}
