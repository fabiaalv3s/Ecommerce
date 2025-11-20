import { User, UserCreateDTO, UserResponseDTO } from '../models/User';

export interface IUserRepository {
  create(user: UserCreateDTO): Promise<UserResponseDTO>;
  findById(id: number): Promise<UserResponseDTO | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<UserResponseDTO[]>;
  update(id: number, user: Partial<User>): Promise<UserResponseDTO | null>;
  delete(id: number): Promise<boolean>;
}




