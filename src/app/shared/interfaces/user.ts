export interface User {
  name: string
  email: string
  password: string
  isNotifications: boolean
  _id: string
  lastVisitDate?: Date
}
