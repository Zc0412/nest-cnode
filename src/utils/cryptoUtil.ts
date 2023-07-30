import { createHash } from 'crypto';

export const cryptoPassword = (password: string): string => {
  const hash = createHash('md5');
  hash.update(password);
  return hash.digest('hex');
};
