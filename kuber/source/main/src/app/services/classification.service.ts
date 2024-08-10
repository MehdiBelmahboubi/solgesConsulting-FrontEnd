import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, CONFIG_TOKEN } from '@config/config';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Classification } from 'app/models/classification.model';
import { classificationType } from 'app/models/classificationType.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Classification[]> = new BehaviorSubject<Classification[]>(
    []
  );
  dialogData!: Classification;
  constructor(private httpClient: HttpClient,
    @Inject(CONFIG_TOKEN) private appConfig: AppConfig,
    private localStorageService: LocalStorageService) {
    super();
  }

  addClassification(classification:Classification):Observable<any>{
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      classification.companyId = companyId;
      return this.httpClient.post<Classification>(`${this.appConfig.apiUrl}/classifications`,classification);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }

  updateClassification(classification:Classification):Observable<any>{
    return this.httpClient.put<Classification>(`${this.appConfig.apiUrl}/classifications`,classification);
  }

  getAllTypes() : Observable<classificationType[]>{
    return this.httpClient.get<classificationType[]>(`${this.appConfig.apiUrl}/classifications/types`)
  }
}
