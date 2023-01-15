import React from 'react';
import Styles from '../../utils/styles.js';

function EventDashboard({util, event}) {
  return (
    event && (
      <>
        <h1 className={Styles.title}>{event.name}</h1>
        <div className={Styles.bodyContainer}>
          <div>
            {event.description}
          </div>
          {(event.organisers.includes(util.user._id)) && (
            <>
              <button onClick={()=>{util.setMode('eventDetails')}} className={Styles.buttonLong}>Event Details</button>
              <button onClick={()=>{util.setMode('eventParticipants')}} className={Styles.buttonLong}>Participants</button>
              <button onClick={()=>{util.setMode('inviteUsers')}} className={Styles.buttonLong}>Invite People</button>
              <button className={Styles.buttonLong}>Post Information</button>
            </>
          )}
        </div>
        <div className={Styles.buttonContainer}>
          <button className={Styles.buttonShort} onClick={()=>{util.setMode('userDashboard')}}>Dashboard</button>
        </div>
      </>
    )
  );
}

export default EventDashboard;