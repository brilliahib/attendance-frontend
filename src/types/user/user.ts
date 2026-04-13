import { Employee } from "../employee/employee";

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  employee: Employee;
  createdAt: Date;
  updatedAt: Date;
}
