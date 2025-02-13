export type DatabaseType = 'mysql' | 'postgres';
export type TokenPayload = { userId: number; username: string };
export type identifyType = 'email' | 'username' | 'mobile';
export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
