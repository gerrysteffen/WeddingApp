import React from 'react';
import Styles from '../../utils/styles.js';
import { BiEdit } from 'react-icons/bi';

function EventDashboard({util, event}) {
  return (
    event && (
      <>
        <div className={Styles.title}>
          {event.name}
          {event.organisers.includes(util.user._id) && <button onClick={()=>{util.setMode('manageEvent')}}><BiEdit className='ml-4' size='36px' /></button>}
        </div>
        <div className={Styles.bodyContainer}>
          <div className='flex flex-row'>
            <button onClick={()=>{util.setMode('eventDetails')}} className={Styles.buttonLong}>Event Details</button>
            <button onClick={()=>{util.setMode('eventParticipants')}} className={Styles.buttonLong+' ml-4'}>Participants</button>
          </div>
        </div>
      </>
    )
  );
}

export default EventDashboard;