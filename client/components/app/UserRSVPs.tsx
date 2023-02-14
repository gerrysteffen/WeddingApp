import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';
import { StateType } from '../../types';

function UserRSVPs() {
  const invites = useSelector((state: StateType) => state.user.invites);
  const accessToken = useSelector((state: StateType) => state.accessToken);
  const [fullInvites, setFullInvites] = useState(null);

  useEffect(() => {
    const getInvites = async () => {
      const res = await apiCalls.getInvites(accessToken, invites);
      console.log(res);
      setFullInvites(res);
    };
    getInvites();
  }, []);

  return (
    <>
      <h1 className={Styles.title}>RSVPs</h1>
      {fullInvites ? (
        <div className={Styles.bodyContainer}>
          {fullInvites.map(
            (invite) =>
              invite.event && (
                <div key={invite._id} className='flex flex-row justify-between mt-4'>
                  <div>{invite.event.name}</div>
                  <div className='flex flex-row items-center'>
                    <div className='italic mr-4'>{invite.attendanceStatus}</div>
                    <div className={(invite.rsvps.length>0 ? 'bg-green-600' : 'bg-red-600')+' italic border border-black mr-4  w-4 h-4 rounded-full'}></div>
                    <Link href={'/rsvp/' + invite._id} ><div className='text-blue-800'>Edit</div></Link>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <div className={Styles.bodyContainer}>
          <div className='italic'>none to display</div>
        </div>
      )}
    </>
  );
}

export default UserRSVPs;
