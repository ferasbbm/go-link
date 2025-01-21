import { IdentifyType } from 'src/common/enums/app.enums';

export const identifyType = (identifier: string): IdentifyType => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const mobileRegex = /^\+?[0-9]{7,14}$/;

  if (emailRegex.test(identifier)) return IdentifyType.EMAIL;

  if (mobileRegex.test(identifier)) return IdentifyType.MOBILE;

  return IdentifyType.USERNAME;
};
