import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';
import { Store } from '../../types';
import { useRouter } from 'next/router';
import { setActiveEvent } from '../../store/actions';

function CreateEvent() {
  const [eventInfo, setEventInfo] = useState({
    name: '',
    date: '',
    description: '',
  });
  const accessToken = useSelector((state: Store) => state.accessToken);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setEventInfo({
      ...eventInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const res = await apiCalls.postEvent(accessToken, eventInfo);
    if (res.error) {
      console.log(res.error);
      // TODO: Change this to actual message on screen
    } else {
      dispatch(setActiveEvent(res.event));
      router.push(`../event/${res.event._id}`);
    }
  };

  return (
    <>
      <h1 className={Styles.title}>Create Event</h1>
      <div className={Styles.bodyContainer}>
        <form id='dataStep1' className='flex flex-col'>
          <label className='pl-2'>Name</label>
          <input
            value={eventInfo.name}
            name='name'
            onChange={(e) => {
              handleChange(e);
            }}
            type='text'
            placeholder='Name of the event'
            className='border border-black p-2'
          ></input>
          <label className='mt-2 pl-2'>Date</label>
          <input
            value={eventInfo.date}
            name='date'
            onChange={(e) => {
              handleChange(e);
            }}
            type='date'
            className='border border-black p-2'
          ></input>
          <label className='mt-2 pl-2'>Description</label>
          <textarea
            value={eventInfo.description}
            name='description'
            onChange={(e) => {
              handleChange(e);
            }}
            rows={6}
            placeholder='Give it a description or tagline'
            className='border border-black p-2'
          ></textarea>
        </form>
      </div>
      <div className={Styles.buttonContainer}>
        <button
          type='submit'
          onClick={() => {
            handleSubmit();
          }}
          className={Styles.buttonLong}
        >
          Create
        </button>
      </div>
    </>
  );
}

export default CreateEvent;
