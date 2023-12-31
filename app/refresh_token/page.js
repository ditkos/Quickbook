'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SiQuickbooks } from "react-icons/si";
import { URL_BASE } from '@/utils/endpoint';
import { useSearchParams } from 'next/navigation'


const TokenDetails = ({ token }) => {
    const [showFullToken, setShowFullToken] = useState(false);

    const truncatedToken = token && token.access_token ? token.access_token.slice(0, 100) + (token.access_token.length > 100 ? '...' : '') : '';

    const formatExpirationDate = (expiresInSeconds) => {
        if (!expiresInSeconds) {
            return '';
        }

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + expiresInSeconds * 1000);

        const formattedDate = expirationDate.toISOString().split('T')[0];
        return formattedDate;
    };

    const copyToClipboard = () => {
        if (!token) {
            alert('Token is not available');
        } else {
            const dataString = `ACCESS_TOKEN='${token.access_token}'\nREFRESH_TOKEN='${token.refresh_token}'`;
            navigator.clipboard.writeText(dataString).then(() => {
                alert('Tokens copied to clipboard!');
            }).catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
        }
    };

    const toggleShowMore = () => {
        setShowFullToken((prevShowFullToken) => !prevShowFullToken);
    };


    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <h2 className='mb-4'>Detalles del Token de Acceso</h2>
                <div className='flex items-center gap-2'>
                    <button onClick={copyToClipboard}>Copy token</button>
                    <button onClick={toggleShowMore}>{showFullToken ? 'Show Less' : 'Show More'}</button>
                </div>
                {showFullToken ? (
                    <div>
                        <pre>{JSON.stringify(
                            {
                                ...token,
                                access_token: truncatedToken,
                                x_refresh_token_expires_in: formatExpirationDate(token.x_refresh_token_expires_in),
                            }, null, 2)}</pre>
                    </div>
                ) : (
                    <div>
                        <p>{truncatedToken}</p>
                    </div>
                )}
            </div>
            {/* Otros detalles del token */}
        </div>
    );
};


const Refresh_Token = () => {

    const [access_token, setAccess_token] = useState([])

    const searchParams = useSearchParams();

    const [params, setParams] = useState({
        client_id: '',
        client_secret: '',
        x_refresh_token: ''
    })

    useEffect(() => {
        const clientId = searchParams.get('client_id');
        const clientSecret = searchParams.get('client_secret');
        const x_refresh_token = searchParams.get('x_refresh_token');

        if (clientId && clientSecret) {
            setParams({
                client_id: clientId.toString(),
                client_secret: clientSecret.toString(),
                x_refresh_token: x_refresh_token.toString()
            });
        }
    }, [searchParams]);

    const isButtonDisabled = params.client_id === '' || params.client_secret === '';
    const Send = async () => {
        const queryString = new URLSearchParams(params).toString(); // Convierte el objeto en una cadena de consulta
        const res = await fetch(`${URL_BASE}/api/refresh_token?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if (res.status === 200) {
            setAccess_token(data)

        } else {
            console.log("error")
        }
    }


    return (
        <>
            <div className='flex flex-col justify-center items-center h-screen'>
            <TokenDetails token={access_token} />
                <div className='p-4'>
                    <div className='flex flex-col gap-2'>
                        <input
                            type='text' className='bg-gray-100 p-2 rounded-sm outline-none'
                            placeholder='Client_id'
                            value={params.client_id}
                            onChange={(e) => setParams({ ...params, client_id: e.target.value })}
                        />
                        <input
                            type='text'
                            className='bg-gray-100 p-2 rounded-sm outline-none'
                            placeholder='Client_Secret'
                            value={params.client_secret}
                            onChange={(e) => setParams({ ...params, client_secret: e.target.value })}
                        />
                        <input
                            type='text'
                            className='bg-gray-100 p-2 rounded-sm outline-none'
                            placeholder='x_refresh_token'
                            value={params.x_refresh_token}
                            onChange={(e) => setParams({ ...params, x_refresh_token: e.target.value })}
                        />
                    </div>
                    <div className='bg-green-500 p-2 text-white'>
                        <button disabled={isButtonDisabled} className='flex items-center gap-2' onClick={Send}>
                            Refresh Token <SiQuickbooks size={30} />
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Refresh_Token;