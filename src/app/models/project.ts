import { Activity } from "./activity";

export interface Project {

  id: number;
  name: string;
  type: string;
  startDate: Date;
  endDate: Date;
  activities: Array<Activity>;
  clientId: number;
}
