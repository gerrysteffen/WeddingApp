import React from 'react';
import EventIndex from '.';
import { useRouter } from 'next/router'

function Eventid() {
  const router = useRouter()
  const { eventid } = router.query
  return (
    <>
      <EventIndex eventid={eventid} />
    </>
  );
}

export default Eventid;