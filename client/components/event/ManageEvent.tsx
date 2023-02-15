import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEventMode } from '../../store/actions/index.js';
import { Store } from '../../types.js';
import Styles from '../../utils/styles.js';

function ManageEvent() {
  const user = useSelector((state: Store) => state.user);
  const activeEvent = useSelector((state: Store) => state.activeEvent);

  const dispatch = useDispatch()

  const handleClick = (newEventMode: string) => {
    dispatch(setEventMode(newEventMode))
  }

  return (
    activeEvent && activeEvent.organisers.includes(user._id) && (
      <>
        <h1 className={Styles.title}>Manage Event</h1>
        <div className={Styles.bodyContainer}>
          <button onClick={()=>{handleClick('manageEventDetails')}} className={Styles.buttonLong}>Edit Event Details</button>
          <button onClick={()=>{handleClick('manageParticipants')}} className={Styles.buttonLong}>Manage Participants</button>
          <button onClick={()=>{handleClick('createEventInvites')}} className={Styles.buttonLong}>Invite People</button>
          <button onClick={()=>{handleClick('manageEventInvites')}} className={Styles.buttonLong}>Manage Invites</button>
          <button onClick={()=>{handleClick('manageEventInvites')}} className={Styles.buttonLong}>Manage RSVPs</button>
          <button onClick={()=>{handleClick('createEventComms')}} className={Styles.buttonLong}>Post Information</button>
          <button onClick={()=>{handleClick('manageEventComms')}} className={Styles.buttonLong}>Manage Previous Posts</button>
        </div>
      </>
    )
  );
}

export default ManageEvent;