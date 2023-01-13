import React, { useState } from 'react';
import Head from 'next/head';
import apiCalls from '../../utils/apiCallService.js';
import auth from '../../utils/auth.js';


function index(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await apiCalls.loginUser({ email, password });
    if (res.error) {
      console.log(res.message);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      // props.setIsAuthenticated(true);
      auth.login(() => console.log('logged in'));
    }
    console.log(res);
  };

  return (
    <>
      <Head>
        <title>Wedding App</title>
        <meta name='description' content='Wedding app' />
      </Head>
      <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
        <div className='absolute top-10 right-6'>
          <a href='./'>Menu</a>
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
              className='mt-4 border border-black p-2 bg-slate-200 rounded'
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
