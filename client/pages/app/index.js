import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import apiCalls from '../../utils/apis/index.js';
import CreateEvent from '../../components/app/CreateEvent.js';
import MyEvents from '../../components/app/MyEvents.js';
import AllEvents from '../../components/app/AllEvents.js';

function appIndex(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null)
  const [mode, setMode] = useState('main')

  const router = useRouter();

  // BELOW: if there is an access token stored get initial user information,
  // if no access token or no user for access token redirect to login
  useEffect(() => {
    const initialSetup = async () => {
      const newAccessToken = localStorage.getItem('accessToken');
      setAccessToken(newAccessToken)
      if (!newAccessToken) {
        logout()
      } else if (!currentUser) {
        const user = await apiCalls.getInitialUser(newAccessToken);
        user ? setCurrentUser(user) : logout();
      }
    };
    initialSetup();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAccessToken(null)
    router.push('./login')
  }

  const util = {
    accessToken: accessToken,
    setMode: setMode,
  }

  return (
    <>
      {currentUser ? (
        <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
          {(mode === 'main') && (
            <>
              <h1 className='absolute top-10 left-6 text-48px'>Hello {currentUser.firstName}</h1>
              <div className='absolute top-32 left-0 w-full flex flex-col px-6'>
                <button className='mt-4 border border-black p-2 bg-slate-200 rounded' onClick={()=>{setMode('create')}}>Create Event</button>
                <button className='mt-4 border border-black p-2 bg-slate-200 rounded'>Connect Event with Invite ID</button>
                <button className='mt-4 border border-black p-2 bg-slate-200 rounded' onClick={()=>{setMode('events')}}>Events</button>
                <button className='mt-4 border border-black p-2 bg-slate-200 rounded' onClick={()=>{setMode('myevents')}}>My Events</button>
              </div>
              <div className='absolute left-6 right-6 bottom-10 flex flex-row justify-start'>
                <button type='button' onClick={()=>{logout()}} className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'>Logout</button>
              </div>
            </>
          )}
          {(mode === 'create') && (
            <CreateEvent util={util} />
          )}
          {(mode === 'myevents') && (
            <MyEvents util={util} />
          )}
          {(mode === 'events') && (
            <AllEvents util={util} />
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default appIndex;
