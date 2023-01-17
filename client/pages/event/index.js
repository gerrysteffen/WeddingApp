import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import PublicEventDetails from '../../components/eventPublic/PublicEventDetails';
import PublicEventPage from '../../components/eventPublic/PublicEventPage';
import Step0 from '../../components/eventPublic/Step0';
import apiCalls from '../../utils/apis';

function EventIndex({ eventid }) {
  const [event, setEvent] = useState(null);
  const [mode, setMode] = useState('eventPage');

  useEffect(() => {
    const getPublicEventInfo = async () => {
      const res = await apiCalls.getPublicEvent(eventid);
      if (res.error) {
        console.log(res.message);
      } else {
        setEvent(res);
      }
    };
    if (eventid) getPublicEventInfo();
  });

  return (
    <div>
      <div className='absolute top-4 right-4 z-10'>
        <Link href='./'>
          <BiMenu color='gray' size='36px' />
        </Link>
      </div>
      {!event ? (
        <Step0 eventid={eventid} setEvent={setEvent} />
      ) : (
        <>
        {mode === 'eventPage' && <PublicEventPage event={event} setMode={setMode} />}
        {mode === 'eventDetails' && <PublicEventDetails event={event}  setMode={setMode} />}
        </>
      )}
    </div>
  );
}

export default EventIndex;
