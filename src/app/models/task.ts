import { Activity } from "./activity";
import { User } from "./user";

export interface Task {

     id: number;
     user: User;
     activity: Activity;
     quantity: number;
     executionDate: Date;
     createdAt: Date;
}
