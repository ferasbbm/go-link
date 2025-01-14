import * as randomstring from 'randomstring';

export const generateShortUrl = async (length: number = 6): Promise<string> => {
  return randomstring.generate(length);
};
