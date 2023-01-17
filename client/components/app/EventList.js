import React from 'react';
import Styles from '../../utils/styles';

function EventList({ util, title, events }) {
  return (
    <>
      <h1 className={Styles.title}>{title}</h1>
      <div className={Styles.bodyContainer}>
        {events.length > 0 ? (
          events.map((event) => (
            <button
              key={event._id}
              onClick={() => {
                util.setActiveEventId(event._id);
                util.setMode('eventDashboard');
              }}
              className={Styles.buttonLong}
            >
              {event.name}
            </button>
          ))
        ) : (
          <div>No events to display</div>
        )}
      </div>
    </>
  );
}

export default EventList;
