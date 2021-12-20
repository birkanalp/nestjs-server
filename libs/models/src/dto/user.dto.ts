export class CreateUserDto {
  name: string;
  lastname: string;
  email: string;
  password: string;
  dateOfBirth?: Date;
}
