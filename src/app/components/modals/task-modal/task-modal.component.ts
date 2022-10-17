import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "@shared/services/task.service";
import {FolderService} from "@shared/services/folder.service";
import {Task} from "@shared/interfaces/task";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss',
    '../../../../assets/styles/modal.scss']
})
export class TaskModalComponent implements OnInit {
  public form!: FormGroup;
  public task: { date: string; description: string } = {description: '', date: ''}

  constructor(private taskService: TaskService,
              private folderService: FolderService,
              @Inject(MAT_DIALOG_DATA) public data: {
                title: string,
                taskAction: (task: Task) => void,
                task?: { date: string; description: string }
              }, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.data.task) { this.task = this.data.task }
    this.createForm()
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      "description": [this.task.description, [Validators.required]],
      "date": [this.task.date, [Validators.required]]
    })
  }

  get _description(): any {
    return this.form.get('description')
  }

  get _date(): any {
    return this.form.get('date')
  }

  datepickerFilter = (date: Date | null): boolean => {
    if (date) {
      return date.getTime() > Date.now()
    }
    return false
  }
}
