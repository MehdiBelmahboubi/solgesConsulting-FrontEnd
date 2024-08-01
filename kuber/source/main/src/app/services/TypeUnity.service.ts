import {Inject, Injectable} from '@angular/core';

import {HttpClient, HttpParams} from "@angular/common/http";

import {Observable} from "rxjs";
import {AppConfig, CONFIG_TOKEN} from "@config/config";
import {TypeUnity} from "../models/TypeUnity.model";
import {LocalStorageService} from "./storage/local-storage.service";
import {AbstractRestService} from "../client-sirh/shared/service/AbstractRest.service";

@Injectable({
  providedIn: 'root'
})
export class TypeUnityService extends AbstractRestService<TypeUnity>{

  constructor( private http:HttpClient,
               @Inject(CONFIG_TOKEN) private appConfig:AppConfig,
               private localStorageService:LocalStorageService) {
    super(http,`${appConfig.apiUrl}`,"Type_Unity",
      localStorageService.getCurrentCompany()?.id || -1,localStorageService.getUser()?.id || -1);
  }

  getAll() :Observable<TypeUnity[]>{
    let params = new HttpParams();
    params=params.set('companyId',this.localStorageService.getCurrentCompany()?.id.toString() || '');
    return this.http.get<TypeUnity[]>(this.appConfig.apiUrl+'/unities/type',{params :params})
  }
  save(typeUnity :TypeUnity){
    return this.http.post<TypeUnity>(this.appConfig.apiUrl+'/unities/type',typeUnity);
  }
  update(typeUnity :TypeUnity){
    return this.http.put<TypeUnity>(this.appConfig.apiUrl+'/unities/type',typeUnity);
  }
  duplicate(typeUnity :TypeUnity){
    return this.http.post<TypeUnity>(this.appConfig.apiUrl+'/unities/type/duplicate',typeUnity);
  }
  delete(id: number):Observable<any> {
    console.log("long id :",id)
    return this.http.delete(`${this.appConfig.apiUrl}/unities/type?id=${id}`)
  }

}
