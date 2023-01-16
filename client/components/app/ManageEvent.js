import React from 'react';
import Styles from '../../utils/styles.js';

function ManageEvent({util, event}) {
  return (
    event && (
      <>
        <h1 className={Styles.title}>Manage Event</h1>
        <div className={Styles.bodyContainer}>
          <button onClick={()=>{util.setMode('manageEventDetails')}} className={Styles.buttonLong}>Event Details</button>
          <button onClick={()=>{util.setMode('manageParticipants')}} className={Styles.buttonLong}>Participants</button>
          {(event.organisers.includes(util.user._id)) && (
            <>
              <button onClick={()=>{util.setMode('createEventInvites')}} className={Styles.buttonLong}>Invite People</button>
              <button className={Styles.buttonLong}>Post Information</button>
            </>
          )}
        </div>
      </>
    )
  );
}

export default ManageEvent;