import React, { useEffect, useState } from 'react';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';

function Step0({ eventid, setEvent }) {
  const [currentEventId, setCurrentEventId] = useState('');

  useEffect(() => {
    setCurrentEventId(eventid);
  }, [eventid]);

  const handleSubmit = async (id) => {
    const res = await apiCalls.getPublicEvent(id);
    if (res.error) {
      console.log(res.message);
    } else {
      setEvent(res);
    }
  };

  return (
    <>
      <div className='h-full overflow-y-auto mb-24'>
        <div className={Styles.title}>
          View Public Event Info
        </div>
        <form className={Styles.bodyContainer}>
          <label className='mt-2 pl-2'>Event ID</label>
          <input
            value={currentEventId}
            onChange={(event) => {
              setCurrentEventId(event.target.value);
            }}
            type='text'
            placeholder='Please enter the invitation id you received'
            className='border border-black p-2'
          ></input>
        </form>
        <div className={Styles.buttonContainer}>
          <button
            type='button'
            onClick={() => {
              handleSubmit(currentEventId);
            }}
            className={Styles.buttonLong}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

export default Step0;
