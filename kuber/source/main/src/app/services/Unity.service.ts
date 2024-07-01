import {Inject, Injectable} from '@angular/core';

import {HttpClient, HttpParams} from "@angular/common/http";

import {Observable} from "rxjs";
import {AppConfig, CONFIG_TOKEN} from "@config/config";
import {Unity} from "../models/Unity.model";
import {LocalStorageService} from "./storage/local-storage.service";



@Injectable({
  providedIn: 'root'
})
export class UnityService {

  constructor( private http:HttpClient,
               @Inject(CONFIG_TOKEN) private appConfig:AppConfig,
               private localStorageService: LocalStorageService) { }
  getAll() :Observable<Unity[]>{
    let params = new HttpParams();
    params=params.set('companyId',this.localStorageService.getCurrentCompany()?.id.toString() || '');
    return this.http.get<Unity[]>(this.appConfig.apiUrl+'/unities',{params :params})

  }
  save(unity :Unity){
    return this.http.post<Unity>(this.appConfig.apiUrl+'/unities',unity);
  }
  duplicate(unity :Unity){
    return this.http.post<Unity>(this.appConfig.apiUrl+'/unities/duplicate',unity);
  }
  delete(id: number):Observable<any> {
    console.log("long id :",id)
    return this.http.delete(`${this.appConfig.apiUrl}/unities?id=${id}`)
  }
  changeTheParentOfUnity(unityId:number ,parentUnityId:number){
    let params = new HttpParams();
    params=params.set('unityId',unityId);
    params=params.set("parentUnityId",parentUnityId)
    return this.http.put<Unity>(this.appConfig.apiUrl+'/unities/changeTheParentOfUnity', {},{params:params});
  }

}
