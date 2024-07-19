import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, CONFIG_TOKEN } from '@config/config';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Classification } from 'app/models/classification.model';
import { classificationType } from 'app/models/classificationType.model';
import { BehaviorSubject, Observable } from 'rxjs';

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
    @Inject(CONFIG_TOKEN) private appConfig: AppConfig) {
    super();
  }

  getAllTypes() : Observable<classificationType[]>{
    return this.httpClient.get<classificationType[]>(`${this.appConfig.apiUrl}/classification/getTypes`)
  }
}
