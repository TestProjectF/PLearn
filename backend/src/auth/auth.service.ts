import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(email: string, password: string, role: UserRole) {
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ email, password: hashed, role });
        return this.userRepo.save(user);
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return this.jwtService.sign({ sub: user.id, role: user.role });
        }
        throw new Error('Invalid credentials');
    }
}