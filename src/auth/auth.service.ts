import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username: string = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    const payload: JwtPayload = {
      username,
    };
    const accessToken: string = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
