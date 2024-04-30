import { hash as bcryptHsh, compare, genSaltSync } from "bcrypt";

const providedSaltRounds = Number(process.env.PASSWORD_HASH_SALT) || 10;
const salt = genSaltSync(providedSaltRounds);

export const hash = async (password: string) => {
  return bcryptHsh(password, salt);
};

export const compareHash = async (data: string, hashedData: string) => {
  return compare(data, hashedData);
};
