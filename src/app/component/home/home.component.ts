import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../service/task/task.service";
import {TaskCount} from "../../models/taskCount";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  taskCounts: Array<TaskCount> = []

  ngOnInit(): void {
    this.taskService.countNumberOfTaskByActivityAndProject()
      .subscribe((data: Array<TaskCount>) => {
        this.taskCounts = data;
      })
  }
}
