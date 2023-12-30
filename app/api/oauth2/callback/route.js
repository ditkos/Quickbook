// pages/api/oauth2/callback.js
import { stringify } from 'querystring';
import { Buffer } from 'buffer';
import { cache } from '../../../../utils/redis'
import { URL_ENDPOINT } from '@/utils/endpoint';


export async function GET(request) {

    const endpoint = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
   
    // // Obtener el código de autorización de la consulta
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const realmId = url.searchParams.get('realmId');
    const state = url.searchParams.get('state');
    const query = { code, state, realmId }

    // Intercambio de código por un token de acceso
    const redirectUri = `${URL_ENDPOINT}/Quickbook/`;
    const base64 = "Basic " + Buffer.from(await cache.get('client_id') + ":" + await cache.get('client_secret')).toString('base64');
   

    const params = {
        grant_type: 'authorization_code',
        code: query.code,
        redirect_uri: redirectUri,
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': base64,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: stringify(params),
    });
    const data = await response.json()

    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });

}