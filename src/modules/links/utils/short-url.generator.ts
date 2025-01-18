import * as randomstring from 'randomstring';
import { numberOfNewGeneratedUrlChars } from 'src/common/types/constants/app.constants';

export const generateShortUrl = async (
  length: number = numberOfNewGeneratedUrlChars,
): Promise<string> => {
  return randomstring.generate(length);
};
