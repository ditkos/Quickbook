const URL_ENDPOINT = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
const URL_BASE = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'https://appcenter.intuit.com/connect/oauth2';

export { URL_ENDPOINT,URL_BASE}