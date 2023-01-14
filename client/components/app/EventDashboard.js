import React from 'react';

function EventDashboard({util, event}) {
  return (
    event && (
      <div>
        Hello, this is the page for {event.name}
      </div>
    )
  );
}

export default EventDashboard;