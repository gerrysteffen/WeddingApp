import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import apiCalls from '../../utils/apis/index.js';
import Styles from '../../utils/styles.js';
import { BiMenu } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../../store/actions/index';

function index() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();

  // BELOW: if there is a valid access token stored, redirect to app
  useEffect(() => {
    const initialSetup = async () => {
      const storedAccessToken = localStorage.getItem('accessToken');
      if (storedAccessToken) {
        const user = await apiCalls.getInitialUser(storedAccessToken);
        if (user) {
          dispatch(setUser(user));
          dispatch(setAccessToken(storedAccessToken));
          router.push('/user');
        } else {
          localStorage.removeItem('accessToken');
        }
      }
    };
    initialSetup();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const res = await apiCalls.loginUser(credentials);
    if (res.error) {
      console.log(res.message);
    } else {
      const { accessToken, user } = res;
      localStorage.setItem('accessToken', accessToken)
      dispatch(setUser(user));
      dispatch(setAccessToken(accessToken));
      router.push('/user');
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
          <form className='flex flex-col w-full'>
            <label className='mt-2 pl-2'>Email</label>
            <input
              type='text'
              name='email'
              value={credentials.email}
              placeholder='Email'
              onChange={(e) => {
                handleChange(e);
              }}
              className='border border-black p-2'
            ></input>
            <label className='mt-2 pl-2'>Password</label>
            <input
              type='password'
              name='password'
              value={credentials.password}
              placeholder='Password'
              onChange={(e) => {
                handleChange(e);
              }}
              className='border border-black p-2'
            ></input>
            <button
              type='button'
              onClick={() => handleSubmit()}
              className={Styles.buttonColor}
            >
              Login
            </button>
          </form>
          <div className='mt-4 text-center'>or</div>
          <div className='flex flex-row w-full'>
            <Link href='./register' className='w-full'>
              <button type='button' className={Styles.buttonLong}>
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
