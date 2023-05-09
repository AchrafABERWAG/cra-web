import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task/task.service';
import { Task } from 'src/app/models/task';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity } from "../../models/activity";
import { ActivityService } from "../../service/activity/activity.service";
import { AuthenticationService } from "../../service/authentication/authentication.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private taskService: TaskService,
    private activityService: ActivityService
  ) { }

  displayedColumns: Array<string> = ['activity', ...this.getDaysInMonth(new Date())];
  mapColumns: Map<number, Map<string, Task | null>> = new Map<number, Map<string, Task>>();
  tasksForm: FormGroup = this.fb.group({})
  isDataLoad: boolean = false;
  activities: Map<number, Activity> = new Map();
  total: Map<string, number> = new Map<string, number>();

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    const formOptions: Array<any> = [Validators.min(0), Validators.max(1)];
    this.activityService.getAll().subscribe(activities => {
      activities.map(activity => {
        this.activities.set(activity.id, activity)
        this.mapColumns.set(activity.id, new Map<string, Task>())
      })
      this.taskService.getAll()
        .subscribe((tasks: Array<Task>) => {
          tasks.map(async ts => {
            if (new Date(ts.executionDate).getMonth() === new Date().getMonth()) {
              const taskId0 = `${ts.activity?.id}-${this.getColumnId(ts.executionDate)}`
              this.mapColumns.get(ts.activity?.id)?.set(taskId0, ts);
              this.tasksForm.addControl(taskId0, new FormControl(ts.quantity, formOptions))
            }
          });
          this.activities.forEach(activityId => {
            this.getDaysInMonth(new Date()).map(columnId => {
              const taskId = `${activityId.id.toString()}-${columnId}`;
              if (!this.tasksForm.contains(taskId)) {
                this.tasksForm.addControl(taskId, new FormControl('', formOptions))
              }
            })
          })
          this.tasksForm.valueChanges
            .subscribe(value => {
              this.calculateTotal();
            });
          this.calculateTotal();
          this.isDataLoad = true;
        })
    })
  }

  getDaysInMonth(currentDate: Date): Array<string> {
    let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let days: Array<string> = [];
    while (date.getMonth() === currentDate.getMonth()) {
      days.push(this.getColumnId(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  isDateColumn(column: string): boolean {
    return column !== this.displayedColumns[0];
  }

  getColumnId(date: Date): string {
    const daysTab: Array<string> = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    const d = new Date(date);
    return `${daysTab[d.getDay()]}${d.getDate()}`;
  }

  calculateTotal(): void {
    this.getDaysInMonth(new Date()).map(day => {
      this.total.set(day, 0)
      this.activities.forEach(activity => {
        const key = `${activity.id}-${day}`;
        const total: number = +(this.total.get(day) ?? 0) + (this.tasksForm.value[key] ?? 0);
        this.total.set(day, total);
      });
    });
  }

  isWeekEnd(disColumn: any) {
    if (disColumn === this.displayedColumns[0]) {
      return false;
    }
    return disColumn.toString().startsWith('S') || disColumn.toString().startsWith('D');
  }

  onSubmit() {
    const tasks: Array<any> = [];
    const inputTasksId = this.tasksForm.value;
    Object.keys(inputTasksId).map(id => {
      if (inputTasksId[id] !== '') {
        let date = new Date()
        date.setDate(+id.split('-')[1].substring(1, 3))
        tasks.push({
          activity: {
            id: +id.split('-')[0]
          },
          executionDate: date,
          quantity: inputTasksId[id]
        })
      }
    })
    if (tasks.length > 0) {
      this.taskService.addTask(tasks)
        .subscribe(tasks => this.loadData());
    }
  }
}
