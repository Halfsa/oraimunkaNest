import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { RegistrationDto } from './registration.dto';
import { Response } from 'express';
import { User } from './user';
const users: User[] = [new User('admin@example.com', 'asdf1234', 23)];
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('register')
  @Render('registerForm')
  registerForm() {
    return { errors: [] };
  }
  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }
  @Post('register')
  @Render('registerForm')
  register(@Body() registration: RegistrationDto, @Res() res: Response) {
    const errors: string[] = [];
    if (!registration.email.includes('@')) {
      errors.push('Az email formátum nem megfelelő');
    }
    if (registration.password.length < 8) {
      errors.push('A jelszó túl rövid');
    }
    if (registration.password !== registration.password_again) {
      errors.push('A két jelszó nem egyezik');
    }
    if (parseInt(registration.age) <= 0) {
      errors.push('Az életkor nem megfelelő');
    }
    if (registration.age == '') {
      errors.push('Adja meg az életkort');
    }
    if (errors.length > 0) {
      return {
        errors,
      };
    } else {
      users.push(
        new User(
          registration.email,
          registration.password,
          parseInt(registration.age),
        ),
      );
      console.log(users);
      res.redirect('/');
    }
  }
  @Post('login')
  login(): string {
    return 'You are logged!';
  }
}
