import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import {
  ForgotPasswordRequestDto,
  SigninRequestDto,
  SigninResponseDto,
  SignupDto,
  UpdatePasswordRequestDto,
  UserDto,
} from '@dto';
import { User } from '@entity';
import { ICacheModel, Role } from '@model';
import { Password } from '@util';
import { AppService } from '../../service';

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
    private appService: AppService,
  ) {}

  async signin(req: SigninRequestDto): Promise<SigninResponseDto> {
    const userEntity = await this.userRepo
      .find({
        where: { email: req.email, role: Role.Admin },
      })
      .then((el) => el.find((e) => Password.compare(e.password, req.password)));

    if (userEntity) {
      const user = new UserDto(userEntity);
      const payload: ICacheModel = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
      };
      const access_token = this.jwtService.sign(payload);
      await this.cacheManager.set(access_token, payload);
      return { token: access_token, user };
    }

    throw new ForbiddenException({
      code: '001',
      type: 'global',
      message: 'Email or password wrong!',
    });
  }

  async signout(token: string): Promise<boolean> {
    const user =  this.appService.getActiveUser();
    return this.cacheManager.del(token);
  }

  async signup(req: SignupDto): Promise<UserDto> {
    if (req.password !== req.passwordAgain) {
      throw new BadRequestException(req, 'password wrong');
    }

    const resEmail = await this.userRepo.findOne(undefined, {
      where: { email: req.email },
    });
    if (resEmail) {
      throw new BadRequestException(req, 'This email already using');
    }

    const resUsername = await this.userRepo.findOne(undefined, {
      where: { username: req.username },
    });
    if (resUsername) {
      throw new BadRequestException(req, 'This Username already taken');
    }

    const entity = new User();
    entity.name = req.name;
    entity.email = req.lastname;
    entity.email = req.email;
    entity.username = req.username;
    entity.role = Role.User;
    entity.password = await Password.crypt(req.password);

    return this.userRepo
      .create(entity)
      .save()
      .then<UserDto>((entity) => ({
        id: entity.id,
        username: entity.username,
        email: entity.email,
        name: entity.name,
        lastname: entity.lastname,
        role: entity.role,
      }));
  }

  async updatePassword(req: UpdatePasswordRequestDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async forgotPassword(req: ForgotPasswordRequestDto): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
