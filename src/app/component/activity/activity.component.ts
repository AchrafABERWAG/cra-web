import { Component, OnInit } from '@angular/core';
import { ActivityService } from "../../service/activity/activity.service";
import { Activity } from "../../models/activity";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  projects: Array<Project> = [];

  constructor(
    private fb: FormBuilder,
    private activityService: ActivityService,
    private projectService: ProjectService
  ) {
  }

  activities: Array<Activity> = [];
  addActivity: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'type'];
  activityForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    projectId: [Validators.required]
  });

  ngOnInit(): void {
    this.activityService.getAll()
      .subscribe((data: Array<Activity>) => {
        this.activities = data;
      })
  }

  add() {
    this.addActivity = true;
    //project
    this.projectService.getAll()
      .subscribe((data: Array<Project>) => {
        this.projects = data;
      })
  }

  onSubmit(): void {
    this.activityService.addActivity(this.activityForm.value)
      .subscribe((activity: Activity) => {
        this.activities = [...this.activities, activity];
        this.addActivity = false;
      });
  }

  onCancel() {
    this.activityForm.reset();
    this.addActivity = false;
  }
}
