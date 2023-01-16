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
        invite.guests.forEach(guest => {
          participants.push({
            name: guest.firstName+' '+guest.lastName,
            attendanceStatus: invite.attendanceStatus,
            mainGuest: invite.mainGuest.firstName+' '+invite.mainGuest.lastName,
          })
        })
      })
      setEventParticipants(participants);
    }
  }, [eventInvites]);

  return (
    <>
      <h1 className={Styles.title}>Manage Participants</h1>
      <div className={Styles.bodyContainer}>
        {eventParticipants.map((participant) => {
          return (
            <div key={participant} className='flex flex-row justify-between'>
              <div className='flex flex-row justify-start'>
                <div>{participant.name}</div>
                {(participant.name != participant.mainGuest) && <div className='ml-2'>{participant.mainGuest}'s Guest</div>}
              </div>
              <div>{participant.attendanceStatus}</div>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default ManageParticipants;
