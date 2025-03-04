export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Realty Executives';
export const APP_LOCATION =
  process.env.NEXT_PUBLIC_APP_LOCATION || 'Santa Clarita';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Santa Clarita Real Estate';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const LASTEST_PROPERTIES_LIMIT =
  Number(process.env.LATEST_PROPERTIES_LIMIT) || 4;

export const PAGE_SIZE = Number(process.env.NEXT_PUBLIC_PAGE_SIZE || 12);

export const signInDefaultValues = {
  email: '',
  password: '',
};
