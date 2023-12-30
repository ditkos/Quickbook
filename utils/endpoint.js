const URL_ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://quickbook-two.vercel.app/api' : 'http://localhost:3000/api';
const URL_BASE = process.env.NODE_ENV === 'production' ? 'https://quickbook-two.vercel.app' : 'http://localhost:3000';

export { URL_ENDPOINT, URL_BASE };