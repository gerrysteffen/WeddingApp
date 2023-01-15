import React, { useEffect, useState } from 'react';
import Styles from '../../utils/styles';

function EventParticipants({ util, event }) {
  const [eventInvites, setEventInvites] = useState([]);
  const [eventParticipants, setEventParticipants] = useState([]);

  useEffect(() => {
    console.log(event.invites)
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
      <h1 className={Styles.title}>Participants</h1>
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

      {/* Below code for Dashboard navigation button and button to initiate/cancel updating of general information / exiting of pw mode*/}
      <div className={Styles.buttonContainer}>
        <button
          className={Styles.buttonShort}
          onClick={() => {
            util.setMode('eventDashboard');
          }}
        >
          Back
        </button>
        {/* {editMode ? (
          <button
            onClick={() => {
              setEventInfo(event);
              setEditMode(!editMode);
            }}
            className={Styles.buttonShort}
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className={Styles.buttonShort}
          >
            Edit
          </button>
        )} */}
      </div>
    </>
  );
}

export default EventParticipants;
