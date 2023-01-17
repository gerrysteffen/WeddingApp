import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import apiCalls from '../../utils/apis/index.js';
import Styles from '../../utils/styles.js';
import { BiMenu } from 'react-icons/bi';

function index(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const router = useRouter();

  // BELOW: if there is a valid access token stored, redirect to app
  useEffect(() => {
    const initialSetup = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const user = await apiCalls.getInitialUser(accessToken);
        user && router.push('/app');
      }
    };
    initialSetup();
  }, [accessToken]);

  const handleSubmit = async () => {
    const res = await apiCalls.loginUser({ email, password });
    if (res.error) {
      console.log(res.message);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken)
    }
  };

  return (
    <>
      <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
        <div className='absolute top-4 right-4 z-10'>
          <Link href='./'>
            <BiMenu color='gray' size='36px' />
          </Link>
        </div>
        <h1 className='absolute top-10 left-6 text-48px'>Login</h1>
        <div className='absolute top-32 left-0 w-full flex flex-col px-6'>
          <form
            className='flex flex-col w-full'
          >
            <label className='mt-2 pl-2'>Email</label>
            <input
              type='text'
              value={email}
              placeholder='Email'
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className='border border-black p-2'
            ></input>
            <label className='mt-2 pl-2'>Password</label>
            <input
              type='password'
              value={password}
              placeholder='Password'
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className='border border-black p-2'
            ></input>
            <button
              type='button'
              onClick={()=>handleSubmit()}
              className={
                Styles.buttonColor
              }
            >
              Login
            </button>
          </form>
          <div className='mt-4 text-center'>or</div>
          <div className='flex flex-row w-full'>
            <Link href='./register' className='w-full'>
              <button
                type='button'
                className={Styles.buttonLong}
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
