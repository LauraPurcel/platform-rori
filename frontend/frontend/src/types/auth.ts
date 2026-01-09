export interface Role {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  cnp: string;
  dateOfBirth: string;
  phone?: string;
  email: string;
  address?: string;
  passwordHash: string;
  hireDate: string;
  active: boolean;
  role: Role;
  department?: Department;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
    cnp: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    cnp: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: "EMPLOYEE" | "MANAGER";
}
