import {TaskStatus} from "../enums/task-status";

export  interface StatusCard {
  title: string
  subtitle: string
  icon: string
  status: TaskStatus
}
