import React from 'react';

function UserDashboard({ util }) {
  return (
    <>
      <h1 className='absolute top-10 left-6 text-48px'>
        Hello {util.currentUser.firstName}
      </h1>
      <div className='absolute top-32 left-0 w-full flex flex-col px-6'>
        <button
          className='mt-4 border border-black p-2 bg-slate-200 rounded'
          onClick={() => {
            util.setMode('userProfile');
          }}
        >
          My Profile
        </button>
        <button
          className='mt-4 border border-black p-2 bg-slate-200 rounded'
          onClick={() => {
            util.setMode('events');
          }}
        >
          Events
        </button>
        <button
          className='mt-4 border border-black p-2 bg-slate-200 rounded'
          onClick={() => {
            util.setMode('myEvents');
          }}
        >
          My Events
        </button>
        <div className='mt-10 italic text-center'>
          <div>
            Don't have any events yet?
          </div>
          <div>
            Easy - create a new one or
          </div>
          <div>
            connect an invite you received.
          </div>
        </div>
        <button
          className='mt-4 border border-black p-2 bg-slate-200 rounded'
          onClick={() => {
            util.setMode('createEvent');
          }}
        >
          Create Event
        </button>
        <button className='mt-4 border border-black p-2 bg-slate-200 rounded'>
          Connect Event with Invite ID
        </button>
      </div>
      <div className='absolute left-6 right-6 bottom-10'>
        <button
          type='button'
          onClick={() => {
            util.logout();
          }}
          className='w-full mt-4 border border-black p-2 bg-slate-400 rounded'
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default UserDashboard;
