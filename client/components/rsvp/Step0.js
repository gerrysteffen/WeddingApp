import React, { useState } from 'react';
import Styles from '../../utils/styles';

function Step0({ setInvitationId }) {
  const [invId, setinvId] = useState('')  

  return (
    <>
      <div className='h-full overflow-y-auto mb-24'>
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
        <div className='w-full absolute right-6 bottom-10 flex flex-row justify-end'>
          <button
            type='button'
            onClick={() => {
              setInvitationId(invId)
            }}
            className={Styles.buttonShort}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default Step0;