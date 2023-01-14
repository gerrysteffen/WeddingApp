import React, { useState } from 'react';
import Styles from '../../utils/styles.js';

function EventDashboard({util, event}) {

  return (
    event && (
      <>
        <h1 className={Styles.title}>{event.name}</h1>
        <div className='absolute top-32 bottom-24 left-0 w-full flex flex-col px-6'>
          <div>
            {event.description}
          </div>
          {(event.organisers.includes(util.user._id)) && (
            <>
              <button onClick={()=>{util.setMode('eventDetails')}} className={Styles.buttonLong}>Event Details</button>
              <button className={Styles.buttonLong}>Invite People</button>
              <button className={Styles.buttonLong}>Post Information</button>
            </>
          )}
        </div>
        <div className='absolute left-6 right-6 bottom-10 flex flex-row justify-between'>
          <button className={Styles.buttonShort} onClick={()=>{util.setMode('userDashboard')}}>Dashboard</button>
        </div>
      </>
    )
  );
}

export default EventDashboard;