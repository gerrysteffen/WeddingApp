import React from 'react';
import Head from 'next/head'

function index(props) {
  return (
    <>
      <Head>
        <title>Wedding App</title>
        <meta name="description" content="Wedding app" />
      </Head>
      <div className='absolute top-10 left-10'>
        <a href="./">Menu</a>
      </div>
      <div className='max-w-400 h-full flex flex-col justify-center m-auto'>
        <h1 className='text-48px'>Login</h1>
        <form className='flex flex-col'>
          <label className='mt-2 pl-2'>Email</label>
          <input type='text' placeholder='Email' className='border border-black p-2'></input>
          <label  className='mt-2 pl-2'>Password</label>
          <input type='text' placeholder='Password' className='border border-black p-2'></input>
          <button type='submit' className='mt-4 border border-black p-2 bg-slate-200 rounded'>SUBMIT</button>
        </form>
      </div>
    </>
  );
}

export default index;