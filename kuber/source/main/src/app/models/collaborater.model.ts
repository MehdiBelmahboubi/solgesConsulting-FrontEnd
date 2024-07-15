import { Company } from './company.model';
import { Country } from './country.model';
import { Classification } from './classification.model';
import { Contract } from './contract.model';

export class Collaborater {
  public id!: number;
  // Info Personnels - nv1
  public matricule!: string;
  public civilite!: 'Mr'|'Mme';
  public initiales!: string;
  public firstName!: string;
  public lastName!: string;
  public dateNaissance!: Date;
  public lieuNaissance!: string;
  public sexe!: 'Homme'|'Femme';
  public civNomPrenom!: string;
  public civPrenomNom!: string;
  public photos!: string;
  public signature!: string;
  // Info Immatriculation - nv2
  public cnie!: string;
  public cnieDelivreeLe!: Date;
  public cnieExpireLe!: Date;
  public cnieDelivreePar!: string;
  public numPermisSejour!: string;
  public natPermisSejour!: string;
  public permisSejourDelivreLe!: Date;
  public permisSejourDebVal!: Date;
  public permisSejourFinVal!: Date;
  public numPermisTravail!: string;
  public natPermisTravail!: string;
  public permisTravailDelivreLe!: Date;
  public permisTravailDebVal!: Date;
  public permisTravailFinVal!: Date;
  public numPassePort!: string;
  public passePortDelivreLe!: Date;
  public passePortExpireLe!: Date;
  public passePortDelivrePar!: string;
  // Coordonnees - nv3
  public telephone!: string;
  public tel1!: string;
  public tel2!: string;
  public tel3!: string;
  public email1!: string;
  public email2!: string;
  public email3!: string;
  // Famille - nv4
  public nbEnfantsSaisi!: boolean;
  public nbEnfants!: number;
  public nbEnfantsChargeSaisi!: boolean;
  public nbEnfantCharge!: number;
  public nomJeuneFille!: string;
  public nbPersCharge!: number;
  public nbEpousesSaisi!: boolean;
  public nbEpouses!: number;
  // Other Infos - nv5
  public dateDeces!: Date;
  public dateCertifDeces!: Date;
  // nationalite: string;
  // nationalite2: string;
  public dateNaturalisation!: Date;
  public active!: boolean;
  public recrutable!: boolean;
  public excluDeclaration!: boolean;
  public matriculeRecrutement!: string;
  // System - nv0
  public observation!: string;
  public dateCreation!: Date;
  public creePar!: string;
  public dateUpdate!: Date;
  public majPar!: string;
  public countryCode1!:number;
  public countryCode2!:number;
  public company_id!:number;

  public contracts!: Contract[];
  public classifications!: Classification[];
  public company!: Company;
  public countries!: Country[];

  constructor() {}
}
