import { Buffer } from 'buffer';
import { stringify } from 'querystring';


export const GET = async (request) => {
    // Obtener la url con la cual obtendremos la consulta de la consulta
    const url = new URL(request.url);
    // endpoint para obtener el token de acceso
    const endpoint = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';
    // Obtener el código de autorización de la consulta
    const client_id = url.searchParams.get('client_id');
    // Obtener el código de autorización de la consulta
    const client_secret = url.searchParams.get('client_secret');
    // Obtener el código de autorización de la consulta
    const x_refresh_token = url.searchParams.get('x_refresh_token');

    // Concatena el cliente ID y el cliente secreto con ":"
    const credentials = `${client_id}:${client_secret}`;

    // Codifica la cadena usando Base64
    const base64Credentials = Buffer.from(credentials).toString('base64');

    // Agrega "Basic " al principio para obtener el formato correcto para la autenticación
    const authorizationHeader = `Basic ${base64Credentials}`;

    // Define los encabezados
    const headers = {
        'Authorization': authorizationHeader,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    // Define los parámetros
    const params = {
        'grant_type': 'refresh_token',
        'refresh_token': x_refresh_token
    };

    // Realiza la solicitud
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: stringify(params),
    });

    // Obtiene la respuesta
    const data = await response.json();

    // Devuelve la respuesta
    return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
}