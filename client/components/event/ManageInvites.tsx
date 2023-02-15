import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Styles from '../../utils/styles';

function ManageInvites() {
  const eventInvites = useSelector((state: Store) => state.activeEvent.invites);

  return (
    <div>
      <h1 className={Styles.title}>Manage Invites</h1>
      <div className={Styles.bodyContainer + ' overflow-y-auto'}>
        {eventInvites.map((invite) => {
          return (
            <div key={invite._id}>
              <div
                key={invite.mainGuest._id}
                className='flex flex-row justify-between mt-4 items-start'
              >
                <div className='flex flex-col justify-start'>
                  <div className='font-bold'>
                    {invite.mainGuest.firstName +
                      ' ' +
                      invite.mainGuest.lastName}
                  </div>
                  <div className='flex flex-row flex-wrap'>
                    <div>
                      {invite.guests.length <= 1
                        ? 'Max Guests: ' + String(invite.maxAddGuests)
                        : 'Guests: '}
                    </div>
                    {invite.guests.length > 1 &&
                      invite.guests
                        .slice(1)
                        .map((guest) => (
                          <div className='ml-2'>
                            {guest.firstName + ' ' + guest.lastName}
                          </div>
                        ))}
                  </div>
                </div>
                <div className='flex flex-col justify-start items-end'>
                  <div className='flex flex-row items-center'>
                    <div className='italic mr-2'>{invite.attendanceStatus}</div>
                    <div
                      className={
                        (invite.rsvps.length > 0
                          ? 'bg-green-600'
                          : 'bg-red-600') +
                        ' italic border border-black w-4 h-4 rounded-full'
                      }
                    ></div>
                  </div>
                  <div className='text-blue-800 flex'>
                    <div>
                      <button onClick={()=>{navigator.clipboard.writeText(`localhost:3000/rsvp/${invite._id}`)}}>RSVP-Url</button>
                    </div>
                    <div className='ml-2'>
                      <Link href='./app'>Edit</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={Styles.buttonContainer}>
        <button
          type='button'
          onClick={() => {
            console.log('yayaa')
          }}
          className={Styles.buttonLong}
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
}

export default ManageInvites;
