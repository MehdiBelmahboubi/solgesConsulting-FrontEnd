import { Droit } from './droit.model';

export interface Conges {
  id?: number;
  code: string;
  imputablePaix: boolean;
  statut: string;
  dateValidite: Date;
  dateFinValidite: Date;
  unite: string;
  autoriserDefalcation: boolean;
  nbrDefalcation: number;
  autoriserRecondiction: boolean;
  delaiRecondiction: number;
  minJour: number;
  maxJour: number;
  reliquatReconduire: boolean;
  nbrAnneeReliquat: number;
  droits: Droit[];
}
