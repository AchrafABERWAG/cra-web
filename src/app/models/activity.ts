import { Project } from "./project";

export interface Activity {

  id: number;
  name: string;
  type: string;
  projectId: number;
}
