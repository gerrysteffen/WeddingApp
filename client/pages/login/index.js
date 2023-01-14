import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import apiCalls from '../../utils/apis/index.js';
import auth from '../../utils/auth.js';
import Styles from '../../utils/styles.js';

function index(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  // BELOW: if there is a valid access token stored, redirect to app
  useEffect(() => {
    const initialSetup = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const user = await apiCalls.getInitialUser(accessToken);
        user && router.push('./app');
      }
    };
    initialSetup();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await apiCalls.loginUser({ email, password });
    if (res.error) {
      console.log(res.message);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      auth.login(() => router.push('./app'));
    }
  };

  return (
    <>
      <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
        <div className='absolute top-10 right-6'>
          <Link href='./'>Menu</Link>
        </div>
        <h1 className='absolute top-10 left-6 text-48px'>Login</h1>
        <div className='absolute top-32 left-0 w-full flex flex-col px-6'>
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
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
              type='text'
              value={password}
              placeholder='Password'
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className='border border-black p-2'
            ></input>
            <button
              type='submit'
              className={Styles.buttonLong}
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default index;
