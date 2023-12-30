
// app/api/oauth2.js
import { stringify } from 'querystring';
import { redirect } from 'next/navigation'
import { cache } from '../../../utils/redis'
import { URL_BASE } from '@/utils/endpoint';

export async function GET(request) {
  const url = new URL(request.url);
  const client_id = url.searchParams.get('client_id');
  const client_secret = url.searchParams.get('client_secret');
  // Crea una caché con una capacidad máxima de 10 elementos y un tiempo de expiración de 50 segundos


  await cache.set('client_id', client_id, { EX: 60 });
  await cache.set('client_secret', client_secret, { EX: 60 });



  // Debe coincidir con la configuración en el servidor de autorización
  const redirectUri = `${URL_BASE}/Quickbook/`; // Debe coincidir con la configuración en el servidor de autorización

  const authorizationUrl = 'https://appcenter.intuit.com/connect/oauth2?' +
    stringify({
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'com.intuit.quickbooks.accounting',
      state: "test",
    });

  return redirect(authorizationUrl);
}