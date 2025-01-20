import { saltOrRounds } from 'src/common/constants/app.constants';
import * as bcrypt from 'bcrypt';

export const makeHash = async (word: string): Promise<string> =>
  await bcrypt.hash(word, saltOrRounds);
