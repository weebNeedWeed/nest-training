import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "TopSR52",
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;

    const user = this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException("User not exists");
    }

    return user;
  }
}
