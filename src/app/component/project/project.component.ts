import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { Project } from 'src/app/models/project';
import { ClientService } from 'src/app/service/client/client.service';
import { ProjectService } from "../../service/project/project.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private clientService: ClientService) {}

  projects: Array<Project> = [];
  addProject: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'type', 'startDate', 'endDate'];
  
  clients: Array<Client> = [];
  projectForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    type: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    clientId: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.projectService.getAll()
      .subscribe((data: Array<Project>) => {
        this.projects = data;
      })
  }

  add() {
    this.clientService.getAll().subscribe((data: Array<Client>) => {
      this.clients= data;
    })
    this.addProject = true;
  }

  onSubmit(): void {
    this.projectService.addProject(this.projectForm.value)
      .subscribe((project: Project) => {
        this.projects = [...this.projects, project];
        this.addProject = false;
      });
  }

  onCancel() {
    this.projectForm.reset();
    this.addProject = false;
  }
}

