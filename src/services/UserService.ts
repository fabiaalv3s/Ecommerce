import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import { UserCreateDTO, UserResponseDTO } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository?: IUserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async createUser(userData: UserCreateDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    return await this.userRepository.create(userData);
  }

  async login(email: string, password: string): Promise<{ user: UserResponseDTO; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const jwtSecret: string = process.env.JWT_SECRET || 'secret';

    // 👇 usa o tipo correto que a lib espera
    const expiresIn: SignOptions['expiresIn'] =
      (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) ?? '7d';

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role || 'customer',
    };

    const options: SignOptions = {
      expiresIn,
    };

    const token = jwt.sign(payload, jwtSecret, options);

    const { password: _, ...userResponse } = user;
    return {
      user: userResponse as UserResponseDTO,
      token,
    };
  }

  async getUserById(id: number): Promise<UserResponseDTO | null> {
    return await this.userRepository.findById(id);
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    return await this.userRepository.findAll();
  }

  async updateUser(id: number, userData: Partial<UserCreateDTO>): Promise<UserResponseDTO | null> {
    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
