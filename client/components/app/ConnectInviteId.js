import React, { useState } from 'react';
import Styles from '../../utils/styles';

function ConnectInviteId(){
  const [invId, setinvId] = useState('')  

  return (
    <>
      <h1 className={Styles.title}>Connect Event</h1>
      <div className={Styles.bodyContainer}>
        <form className='flex flex-col '>
          <label className='mt-2 pl-2'>Invitation ID</label>
          <input
            value={invId}
            onChange={(event) => {
              setinvId(event.target.value)
            }}
            type='text'
            placeholder='Please enter the invitation id you received'
            className='border border-black p-2'
          ></input>
        </form>
      </div>
      <div className={Styles.buttonContainer}>
        <button
          type='button'
          onClick={() => {
            console.log(invId)
          }}
          className={Styles.buttonLong}
        >
          Continue
        </button>
      </div>
    </>
  );
}

export default ConnectInviteId;