import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export interface IToken {
  name: string;
  value: string;
}
export interface MyCookies extends RequestCookies {
  'my-refresh-token': IToken;
  'my-access-token': IToken;
}
