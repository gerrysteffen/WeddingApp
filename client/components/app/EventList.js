import React from 'react';
import Styles from '../../utils/styles';

function EventList({ util, title, events }) {
  return (
    <>
      <h1 className='absolute top-10 left-6 text-48px'>{title}</h1>
      <div className='absolute top-32 bottom-24 left-0 w-full flex flex-col px-6'>
        {events.length > 0 ? (
          events.map((event) => (
            <button
              key={event._id}
              onClick={() => {
                util.setActiveEvent(event._id);
                util.setMode('eventDashboard');
              }}
              className='mt-4 border border-black p-2 bg-slate-200 rounded'
            >
              {event.name}
            </button>
          ))
        ) : (
          <div>No events to display</div>
        )}
      </div>
      <div className='absolute left-6 right-6 bottom-10 flex flex-row justify-between'>
        <button
          className={Styles.buttonShort}
          onClick={() => {
            util.setMode('userDashboard');
          }}
        >
          Dashboard
        </button>
      </div>
    </>
  );
}

export default EventList;
