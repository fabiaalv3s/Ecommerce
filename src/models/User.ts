export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UserResponseDTO {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}


