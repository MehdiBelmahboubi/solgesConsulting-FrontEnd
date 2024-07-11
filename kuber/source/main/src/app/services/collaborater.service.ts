import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Collaborater } from 'app/models/collaborater.model';
import { AppConfig, CONFIG_TOKEN } from "@config/config";
import { LocalStorageService } from './storage/local-storage.service';

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

  getByComany(): Observable<Collaborater[]> {
    let id = this.localStorageService.getCurrentCompany()?.id.toString();
    return this.httpClient.get<Collaborater[]>(`${this.appConfig.apiUrl}/collaborater/company/${id}/collaboraters`);
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
}
