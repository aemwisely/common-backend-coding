import { IJwtUserDecorator } from '@libs/common/decorator';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface Attributes {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isActive: boolean;
}

interface Behaviors {
  validatePassword(password: string): boolean;
  getPayload(): IJwtUserDecorator;
}

export class AccountAggregate implements Attributes, Behaviors {
  private _id: number;
  private _email: string;
  private _firstName: string;
  private _lastName: string;
  private _password: string;
  private _isActive: boolean;
  private jwtService?: JwtService;

  constructor(attr: Partial<Attributes>, jwtService?: JwtService) {
    this._id = attr.id;
    this._email = attr.email;
    this._firstName = attr.firstName;
    this._lastName = attr.lastName;
    this._password = attr.password;
    this._isActive = attr.isActive;
    this.jwtService = jwtService;
  }

  static createAccountAggregate(
    attr: Partial<Attributes>,
    jwtService?: JwtService,
  ): AccountAggregate {
    return new AccountAggregate(attr, jwtService);
  }

  validatePassword(password: string): boolean {
    const result = bcrypt.compareSync(password, this._password);
    return result;
  }

  getPayload(): IJwtUserDecorator {
    return {
      data: {
        id: this._id,
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        isActive: this._isActive,
      },
    };
  }

  getToken(payload: IJwtUserDecorator) {
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  get id(): number {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }
}
