import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export interface IToken {
  name: string;
  value: string;
}
export interface MyCookies extends RequestCookies {
  'my-refresh-token': IToken;
  'my-access-token': IToken;
}
export interface ISigninForm {
  email: string;
  password: string;
  name?: string;
}
export interface ISignupForm {
  email: string;
  password: string;
  name?: string;
}
export interface IFormError {
  email?: string;
  password?: string;
}

// Props Type
export type FolderDetailProps = {};
