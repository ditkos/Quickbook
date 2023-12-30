export async function GET(request) {
    // Definir la URL del endpoint
    const base_url = 'https://sandbox-quickbooks.api.intuit.com/';
    const endpoint_Purchase = `${base_url}/v3/company/4620816365375100010/query?query=select * from Purchase where TotalAmt < '100.00'&minorversion=40`;

    // Definir el encabezado de autorización
    const access_token = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..iZA2ooxWGxIp2bNdpyc_SA.xrf_uaVUtxKavRDaGQSDkg8qd3pcahcXfkkTjaCxRJqSyhUURUCp2uPiriw_oeYLQlNNTAu-lWDT3imnxbva7t02_zx7qKxRXzV036FJ5zbN6osL9btQ_8ZeBe43Q1-850IECERZykhcDtfDFASqHwKS0ElAIrYZTE0JS7e-sghTFIMp-fbOMHzZ9sTn61AF6Pc5s8I7RE79lrQ9ngqnUTHvXlukcIbTGZAPSW3tgsHqoK06_PDzAUZkpWd5yZ9uri1juX63dKE1KULZOKh0jgznu8s5LLfDjhQrsDflpN1KQ_1TCqLJRjnijWQuqWGcnp4ViiHKzDomn_4Ph9NQ1cqKT8Zw1Hr4ns3GT9zXwLykUdynzfZJhPmB-ikKIkbcgsH9t-il75lSZcBxpGnt1vLEyS4XKAjlbFqRSaiy6-yzfWisLqI52fk7m4AsVt0IPgO5LHGbq_Ur61s4jm4jYV_KXw0PcgVfGdsl-9adn8Xqnva2FRmnBylOBJoLg0y3KY1yBvteFvybZHtQYm88aMeFScfDeIyCYBRA_wuteQxUQHYzOwi7wu3q88XGhyv2gy5NPdSf_6iQdBn93dLTmEfVc2NpXsdD3UAH0LeSoDYDZirQHV-8rXJbSXFAWqCXbCqp2QDTSrOOYsb68UvqBuyMy-gu7eJDmspv377y6osb68wx7Amra4Zb59KAZ18dkPeLBC7bm_bnJiQgYbD5N7cGg34N-WCWRyzlezEcrGyygajD5lWHpXoA_Qwy9kJ6.HGZlBFmInPvXR0_qFXll7g';
    try {
        // Realizar la solicitud GET al endpoint
        const response = await fetch(endpoint_Purchase, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                "content-type": "application/json",
            }
        });
        const data = await response.json();

        if (response.status === 200) {
            // La solicitud fue exitosa
            console.log('Solicitud exitosa:', data);
        } else {
            // La solicitud no fue exitosa, manejar el error apropiadamente
            console.error('Error al realizar la solicitud:', data);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }


    return new Response(JSON.stringify({ message: "John Gouveia" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}