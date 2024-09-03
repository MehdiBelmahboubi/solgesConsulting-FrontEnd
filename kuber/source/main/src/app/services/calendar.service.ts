import {Inject, Injectable} from '@angular/core';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {BehaviorSubject, Observable} from "rxjs";
import {JourFerier} from "../models/jourferier.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppConfig, CONFIG_TOKEN} from "@config/config";
import {LocalStorageService} from "./storage/local-storage.service";
import {Calendar} from "../models/calendar.model";

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends UnsubscribeOnDestroyAdapter{
  private readonly API_URL = 'assets/data/my-projects-client.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<CalendarService[]> = new BehaviorSubject<CalendarService[]>(
    []
  );

  dialogData!: JourFerier;
  constructor(private httpClient: HttpClient,
              @Inject(CONFIG_TOKEN) private appConfig: AppConfig,
              private localStorageService: LocalStorageService) {
    super();
  }

  getAllCalendar(statut:boolean):Observable<Calendar[]>{
    const id = this.localStorageService.getCurrentCompany()?.id.toString();
    let param = new HttpParams()
      .set('statut',statut);
    if (id) {
      param = param.set('id', id);
    }
    return this.httpClient.get<Calendar[]>(`${this.appConfig.apiUrl}/calendars`, { params: param })
  }

  addCalendar(calendar:Calendar):Observable<any>{
    const companyId = this.localStorageService.getCurrentCompany()?.id;
    if (companyId !== undefined) {
      calendar.companyId = companyId;
      return this.httpClient.post(`${this.appConfig.apiUrl}/calendars`, calendar);
    } else {
      throw new Error('Current company ID is undefined');
    }
  }

  deleteCalendar(id:number):Observable<any>{
    let param = new HttpParams();
    param = param.set('id', id);
    return this.httpClient.delete(`${this.appConfig.apiUrl}/calendars`, { params: param });
  }

  restoreCalendar(id:number):Observable<any>{
    let param = new HttpParams();
    param = param.set('id', id);
    return this.httpClient.delete(`${this.appConfig.apiUrl}/calendars/restore`, { params: param });
  }
}
