export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
  type: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface Token {
  token: string;
  expiresIn: string;
}
