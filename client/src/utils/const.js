export const API_BASE_URL =
  (process.env.NODE_ENV === 'production'
    ? process.env.APP_URL
    : 'http://localhost:5000') + '/api/';

export const LOCAL_STORAGE_NAME_TOKEN = 'tuntun_token_name';
