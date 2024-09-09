import { Droit } from './droit.model';

export interface Conges {
  id?: number;
  code: string;
  imputablePaix: boolean;
  statut: string;
  dateValidite: Date;
  dateFinValidite: Date;
  unite: string;
  nbrDefalcation: number;
  delaiRecondiction: number;
  minJour: number;
  maxJour: number;
  nbrAnneeReliquat: number;
  droits: Droit[];
  companyId:number;
  calendarId:number;
}
