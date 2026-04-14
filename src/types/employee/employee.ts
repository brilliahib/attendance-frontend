import { User } from "../user/user";

export interface Employee {
  id: string;
  userId: string;
  employeeCode: string;
  fullName: string;
  phone: string;
  department: string;
  position: string;
  joinDate: Date;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
