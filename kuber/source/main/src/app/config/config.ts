import {InjectionToken} from "@angular/core";

export interface AppConfig {
  apiUrl : string;
}

export const APP_CONFIG :AppConfig = {
    apiUrl : 'http://localhost:9898/api/client',
}

export const CONFIG_TOKEN =
  new InjectionToken<AppConfig>('CONFIG_TOKEN',{
    providedIn :'root',
    factory :() => APP_CONFIG
  });
