import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {UserService} from "@shared/services/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  notifications = this.formBuilder.group({
    isNotifications: true,
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  toggle($event: MatCheckboxChange) {
    this.userService.changeNotificationsSettings($event.checked).subscribe()
  }
}
