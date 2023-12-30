'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SiQuickbooks } from "react-icons/si";
import { useRouter } from 'next/navigation'
import { URL_BASE } from '@/utils/endpoint';
import { useSearchParams } from 'next/navigation'

const Home = (slug) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState({
    client_id: '',
    client_secret: ''
  })

  useEffect(() => {
    const clientId = searchParams.get('client_id');
    const clientSecret = searchParams.get('client_secret');
  
    if (clientId && clientSecret) {
      setParams({
        client_id: clientId.toString(),
        client_secret: clientSecret.toString()
      });
    }
  }, [searchParams]);

  const isButtonDisabled = params.client_id === '' || params.client_secret === '';
  const Send = async () => {
    const queryString = new URLSearchParams(params).toString(); // Convierte el objeto en una cadena de consulta
    router.push(`${URL_BASE}/api/oauth2?${queryString}`)
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen gap-2'>
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
      </div>
      <div className='bg-green-500 p-2 text-white'>
        <button disabled={isButtonDisabled} className='flex items-center gap-2' onClick={Send}>
          Authorization Oauth2 QuickBook <SiQuickbooks size={30} />
        </button>
      </div>
    </div>
  );
};

export default Home;