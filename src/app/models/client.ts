import { Project } from "./project";

export interface Client {

  id: number;
  name: string;
  mail: string;
  phone: string;
  siret: string;
  tva: number;
  address: string;
  projects: Array<Project>;
}
