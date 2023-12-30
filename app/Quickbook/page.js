'use client'
import { useEffect, useState } from 'react'
import { URL_ENDPOINT } from '@/utils/endpoint';
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
            <div className='flex flex-col justify-center items-center h-screen'>
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



export default function Page() {

    const slug = useSearchParams();
    const [access_token, setAccess_token] = useState([])
    const request = async () => {
        const res = await fetch(`${URL_ENDPOINT}/oauth2/callback?code=${slug.get('code')}`, {
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
            <div className="flex justify-end p-4 gap-3 text-white">
                <button className='bg-blue-500 p-2' onClick={request}>
                    Get Authorization
                </button>
            </div>
            <TokenDetails token={access_token} />
        </>
    )
}