import React from 'react';
import RSVPindex from '.';
import { useRouter } from 'next/router'

function RSVPid(props) {
  const router = useRouter()
  const { rsvpid } = router.query
  return (
    <>
      <RSVPindex rsvpid={rsvpid} />
    </>
  );
}

export default RSVPid;