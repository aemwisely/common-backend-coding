export abstract class AccountService {
  abstract login(email: string, password: string): Promise<string>;
  abstract validateAccount(email: string, password: string): Promise<boolean>;
}
