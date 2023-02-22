import React from 'react';
import RSVPindex from '.';
import { useRouter } from 'next/router'

function Invid(props) {
  const router = useRouter()
  const { invid } = router.query
  return (
    <>
      <RSVPindex invid={invid} />
    </>
  );
}

export default Invid;