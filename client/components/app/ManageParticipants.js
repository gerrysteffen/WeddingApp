import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Styles from '../../utils/styles';

function ManageParticipants({ util, event }) {
  const [eventInvites, setEventInvites] = useState([]);
  const [eventParticipants, setEventParticipants] = useState([]);

  useEffect(() => {
    setEventInvites(event.invites)
  }, []);

  useEffect(() => {

    if (eventInvites.length>0) {
      const participants = []
      eventInvites.forEach(invite => {
        invite.guests.forEach((guest, index) => {
          participants.push({
            name: guest.firstName+' '+guest.lastName,
            attendanceStatus: invite.attendanceStatus,
            mainGuest: invite.mainGuest.firstName+' '+invite.mainGuest.lastName,
            rsvp: (invite.rsvps[index] ? true : false)
          })
        })
      })
      setEventParticipants(participants);
    }
  }, [eventInvites]);

  return (
    <>
      <h1 className={Styles.title}>Manage Participants</h1>
      <div className={Styles.bodyContainer+' overflow-y-auto'}>
        {eventParticipants.map((participant) => {
          return (
            <div key={participant.name} className='flex flex-row justify-between mt-4 items-start'>
              <div className='flex flex-row justify-start flex-wrap'>
                <div className='font-bold'>{participant.name}</div>
                {(participant.name != participant.mainGuest) && <div className='mx-2'>{participant.mainGuest}'s Guest</div>}
              </div>
              <div className='flex flex-row items-center'>
                    <div className='italic mr-2'>{participant.attendanceStatus}</div>
                    <div className={(participant.rsvp ? 'bg-green-600' : 'bg-red-600')+' italic border border-black mr-2  w-4 h-4 rounded-full'}></div>
                    <div className=' text-blue-800'><Link href='./app'>Invite</Link></div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
} 

export default ManageParticipants;
