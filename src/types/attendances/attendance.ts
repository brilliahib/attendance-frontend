import { Employee } from "../employee/employee";

export interface Attendance {
  id: string;
  employeeId: string;
  workDate: Date;
  checkInAt: Date;
  photoCheckInUrl: string;
  checkInNote: string | null;
  checkOutAt: Date | null;
  photoCheckOutUrl: string | null;
  checkOutNote: string | null;
  employee: Employee;
  createdAt: Date;
  updatedAt: Date;
}
