export type AuthenticationDTO = {
  username: string;
  password: string;
}

export type AuthenticationResponseDTO = {
  username: string;
  jwtToken: string;
  fullName: string;
  authorities: string[];
}