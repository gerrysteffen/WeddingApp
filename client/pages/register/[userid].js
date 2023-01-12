import React from 'react';
import RegIndex from '.';
import { useRouter } from 'next/router'

function Userid(props) {
  const router = useRouter()
  const { userid } = router.query

  return (
    <>
      <RegIndex userid={userid} />
    </>
  );
}

export default Userid;