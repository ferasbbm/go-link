import { saltOrRounds } from 'src/common/constants/app.constants';
import * as bcrypt from 'bcrypt';

export const makeHash = async (word: string): Promise<string> =>
  await bcrypt.hash(word, saltOrRounds);

export const checkHash = async (
  plaintext: string,
  hashed: string,
): Promise<boolean> => {
  return await bcrypt.compare(plaintext, hashed);
};
