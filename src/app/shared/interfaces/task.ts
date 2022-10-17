import {TaskStatus} from "../enums/task-status";

export interface Task {
  description: string
  status: TaskStatus
  date: string
  email: string
  _id: string
}
