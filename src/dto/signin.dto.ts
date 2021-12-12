import { UserDto } from '@dto';

export class SigninRequestDto {
  email: string;
  password: string;
}

export class SigninResponseDto {
  token: string;
  user: UserDto;
}
