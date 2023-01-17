import React from 'react';
import Styles from '../../utils/styles.js';

function ManageEvent({util, event}) {
  return (
    event && event.organisers.includes(util.user._id) && (
      <>
        <h1 className={Styles.title}>Manage Event</h1>
        <div className={Styles.bodyContainer}>
          <button onClick={()=>{util.setMode('manageEventDetails')}} className={Styles.buttonLong}>Edit Event Details</button>
          <button onClick={()=>{util.setMode('manageParticipants')}} className={Styles.buttonLong}>Manage Participants</button>
          <button onClick={()=>{util.setMode('createEventInvites')}} className={Styles.buttonLong}>Invite People</button>
          <button onClick={()=>{util.setMode('manageEventInvites')}} className={Styles.buttonLong}>Manage Invites</button>
          <button onClick={()=>{util.setMode('manageEventInvites')}} className={Styles.buttonLong}>Manage RSVPs</button>
          <button onClick={()=>{util.setMode('createEventComms')}} className={Styles.buttonLong}>Post Information</button>
          <button onClick={()=>{util.setMode('manageEventComms')}} className={Styles.buttonLong}>Manage Previous Posts</button>
        </div>
      </>
    )
  );
}

export default ManageEvent;