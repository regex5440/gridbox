import { hash as bcryptHsh, genSaltSync } from "bcrypt";

const providedSaltRounds = Number(process.env.PASSWORD_HASH_SALT) || 10;
const salt = genSaltSync(providedSaltRounds);

export const hash = async (password: string) => {
  return bcryptHsh(password, salt);
};
