import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const saltRound = parseInt(process.env.SERVICE_SALTROUND);
  return await bcrypt.hash(password, saltRound);
}

export async function compareHash(password: string, hashPassword: string) {
  return await bcrypt.compare(password, hashPassword);
}
