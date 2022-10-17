import {Component, OnInit} from '@angular/core';
import {StatusCard} from "@shared/interfaces/status-card";
import {TaskStatus} from "@shared/enums/task-status";
import {Folder} from "@shared/interfaces/folder";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public todoCard: StatusCard = {
    title: 'Todo',
    subtitle: 'create a task for yourself',
    icon: './assets/icons/todo-icon.png',
    status: TaskStatus.todo
  }

  public doingCard: StatusCard = {
    title: 'Doing',
    subtitle: 'you are working on it',
    icon: './assets/icons/doing-icon.png',
    status: TaskStatus.doing
  }

  public doneCard: StatusCard = {
    title: 'Done',
    subtitle: 'completed tasks',
    icon: './assets/icons/done-icon.png',
    status: TaskStatus.done
  }

  public folders: Folder[] = []

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      this.folders = response.folders
    })
  }
}
