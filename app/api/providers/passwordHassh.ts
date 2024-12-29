import bcrypt from 'bcryptjs'

export const hashPassowrd = async (password: string) => {
  if (!password) return null;
  return await bcrypt.hash(password, 10)
}